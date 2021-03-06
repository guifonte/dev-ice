import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MessageService } from 'primeng/api';

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
        MessageService,
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

    it('should return empty or whatever it has subscription', (done) => {
      deviceSubs = devicesUpdateListener.subscribe({
        next: (res) => {
          expect(res).toEqual([]);
          done();
        },
        error: (err) => {
          done(err);
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

    it('should return the list it has to subscription', (done) => {
      const mockedDTO = mockCreateDeviceDTO();
      const mockedDevice = mockDevice();
      const mockedDevice2 = mockDevice();

      Reflect.set(service, 'devices', [mockedDevice, mockedDevice2]);

      deviceSubs = devicesUpdateListener.subscribe({
        next: (res) => {
          expect(res).toEqual([mockedDevice, mockedDevice2]);
          done();
        },
        error: (err) => {
          done(err);
        },
      });

      service.createDevice(mockedDTO);

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      const emsg = 'deliberate 404 error';
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteDevice', () => {
    it('should return empty array if server delete the only device', (done) => {
      const mockedDevice = mockDevice();
      const mockedId = mockedDevice.id;

      Reflect.set(service, 'devices', [mockedDevice]);

      deviceSubs = devicesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual([]);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      service.deleteDevice(mockedId);

      const req = httpTestingController.expectOne(`${url}/${mockedId}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });

    it('should delete only the asked device', (done) => {
      const mockedDevice = mockDevice();
      const mockedId = mockedDevice.id;
      const mockedDevice2 = mockDevice();

      Reflect.set(service, 'devices', [mockedDevice, mockedDevice2]);

      deviceSubs = devicesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual([mockedDevice2]);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      service.deleteDevice(mockedId);

      const req = httpTestingController.expectOne(`${url}/${mockedId}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });

    it('should return error to subscription', (done) => {
      const mockedDevice = mockDevice();
      const mockedId = mockedDevice.id;
      const mockedDevice2 = mockDevice();

      Reflect.set(service, 'devices', [mockedDevice, mockedDevice2]);

      deviceSubs = devicesUpdateListener.subscribe({
        next: (res) => {
          expect(res).toEqual([mockedDevice, mockedDevice2]);
          done();
        },
        error: (err) => {
          done(err);
        },
      });

      service.deleteDevice(mockedId);

      const req = httpTestingController.expectOne(`${url}/${mockedId}`);
      expect(req.request.method).toEqual('DELETE');
      const emsg = 'deliberate 404 error';
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });
});
