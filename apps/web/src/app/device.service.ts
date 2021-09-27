import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateDeviceDTO, Device } from '@dev-ice/domain';
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

  private updateDevicesUpdated() {
    this.devicesUpdated.next([...this.devices]);
  }

  getDevicesUpdateListener() {
    return this.devicesUpdated.asObservable();
  }

  getDevices() {
    this.http.get<Device[]>(url).subscribe({
      next: (res) => {
        this.devices = res;
        this.updateDevicesUpdated();
      },
      error: (err) => {
        this.devicesUpdated.error(err);
      },
    });
  }

  createDevice(createDeviceDTO: CreateDeviceDTO) {
    this.http.post<Device>(url, createDeviceDTO).subscribe({
      next: (res) => {
        this.devices = [...this.devices, res];
        this.updateDevicesUpdated();
      },
      error: (err) => {
        this.devicesUpdated.error(err);
      },
    });
  }
}
