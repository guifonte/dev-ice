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
      error: () => {
        this.updateDevicesUpdated();
      },
    });
  }

  createDevice(createDeviceDTO: CreateDeviceDTO) {
    this.http.post<Device>(url, createDeviceDTO).subscribe({
      next: (res) => {
        this.devices = [...this.devices, res];
        this.updateDevicesUpdated();
      },
      error: () => {
        this.updateDevicesUpdated();
      },
    });
  }

  deleteDevice(id: number) {
    this.http.delete<void>(`${url}/${id}`).subscribe({
      next: () => {
        this.devices = this.devices.filter((dev) => dev.id !== id);
        this.updateDevicesUpdated();
      },
      error: () => {
        this.updateDevicesUpdated();
      },
    });
  }
}
