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

const url = env.baseURL + '/api/categories';

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
});
