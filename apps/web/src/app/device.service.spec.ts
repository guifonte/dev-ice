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
import { mockDevice } from '@dev-ice/testing';

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
});
