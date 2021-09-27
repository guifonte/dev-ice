import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Device } from '@dev-ice/domain';
import { DeviceService } from '../device.service';

@Component({
  selector: 'dev-ice-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit, OnDestroy {
  devices: Device[] = [];

  private deviceSub!: Subscription;
  constructor(public deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceSub = this.deviceService
      .getDevicesUpdateListener()
      .subscribe((devices) => {
        this.devices = devices;
        console.log(this.devices);
      });
    this.deviceService.getDevices();
  }

  ngOnDestroy(): void {
    this.deviceSub.unsubscribe();
  }
}
