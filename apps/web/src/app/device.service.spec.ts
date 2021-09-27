import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { Device } from '@dev-ice/domain';
import { DeviceService } from './device.service';
import { ErrorInterceptor } from './error-interceptor';

import { environment as env } from '../environments/environment';
import {
  fromMockedDeviceToMockedCreateDeviceDTO,
  mockCreateDeviceDTO,
  mockDevice,
} from '@dev-ice/testing';

const url = env.baseURL + '/api/devices';

describe('DeviceService', () => {
  let service: DeviceService;
  let httpTestingController: HttpTestingController;
  let devicesUpdateListener: Observable<Device[]>;
  let deviceSubs: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DeviceService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DeviceService);
    devicesUpdateListener = service.getDevicesUpdateListener();
    window.alert = jest.fn();
  });

  afterEach(() => {
    httpTestingController.verify();
    deviceSubs?.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDevices', () => {
    it('should return [] if server respond with []', (done) => {
      const expectedDevices: Device[] = [];
      deviceSubs = devicesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual(expectedDevices);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      service.getDevices();

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedDevices);
    });

    it('should return a list with one device if server respond with a list with one device', (done) => {
      const expectedDevices: Device[] = [mockDevice()];
      deviceSubs = devicesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual(expectedDevices);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      service.getDevices();

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedDevices);
    });

    it('should return error to subscription', (done) => {
      deviceSubs = devicesUpdateListener.subscribe({
        next: () => {
          done('should not be here');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toEqual(404);
          expect(err.error).toEqual(emsg);
          done();
        },
      });

      service.getDevices();

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      const emsg = 'deliberate 404 error';
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('createDevice', () => {
    it('should return a list with one device if devices list is empty', (done) => {
      const mockedDevice: Device = mockDevice();
      const mockedDTO = fromMockedDeviceToMockedCreateDeviceDTO(mockedDevice);

      deviceSubs = devicesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual([mockedDevice]);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      service.createDevice(mockedDTO);

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(mockedDevice);
    });

    it('should return a list with two device if device list had only a device', (done) => {
      const mockedDevice: Device = mockDevice();
      const mockedDevice2: Device = mockDevice();
      const mockedDTO = fromMockedDeviceToMockedCreateDeviceDTO(mockedDevice);
      const mockedDTO2 = fromMockedDeviceToMockedCreateDeviceDTO(mockedDevice2);

      service.createDevice(mockedDTO);
      service.createDevice(mockedDTO2);

      const req = httpTestingController.match(url);
      expect(req.length).toBe(2);
      expect(req[0].request.method).toEqual('POST');
      req[0].flush(mockedDevice);

      deviceSubs = devicesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual([mockedDevice, mockedDevice2]);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      req[1].flush(mockedDevice2);
    });

    it('should return error to subscription', (done) => {
      const mockedDTO = mockCreateDeviceDTO();

      deviceSubs = devicesUpdateListener.subscribe({
        next: () => {
          done('should not be here');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toEqual(404);
          expect(err.error).toEqual(emsg);
          done();
        },
      });

      service.createDevice(mockedDTO);

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      const emsg = 'deliberate 404 error';
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });
});
