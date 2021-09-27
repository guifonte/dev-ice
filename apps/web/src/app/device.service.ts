import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@dev-ice/domain';
import { Subject } from 'rxjs';

import { environment as env } from '../environments/environment';

const url = env.baseURL + '/api/devices';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private devices: Device[] = [];
  private devicesUpdated = new Subject<Device[]>();

  constructor(private http: HttpClient) {}

  private updateCategoriesUpdated() {
    this.devicesUpdated.next([...this.devices]);
  }

  getDevicesUpdateListener() {
    return this.devicesUpdated.asObservable();
  }

  getDevices() {
    this.http.get<Device[]>(url).subscribe({
      next: (res) => {
        this.devices = res;
        this.updateCategoriesUpdated();
      },
      error: (err) => {
        this.devicesUpdated.error(err);
      },
    });
  }
}
