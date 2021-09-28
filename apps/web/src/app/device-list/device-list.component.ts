import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Device } from '@dev-ice/domain';
import { DeviceService } from '../device.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'dev-ice-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit, OnDestroy {
  devices: Device[] = [];

  loading = false;

  private deviceSub!: Subscription;
  constructor(
    public deviceService: DeviceService,
    private titleService: Title,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.titleService.setTitle(
      'Categories | Dev-ice - Your devices organized and safe in the Cloud'
    );
  }

  ngOnInit(): void {
    this.loading = true;
    this.deviceSub = this.deviceService.getDevicesUpdateListener().subscribe({
      next: (devices) => {
        if (this.devices.length > devices.length) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Device Deleted',
            life: 3000,
          });
        }
        this.devices = devices;
        console.log(this.devices);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
    this.deviceService.getDevices();
  }

  deleteDevice(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this device?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deviceService.deleteDevice(id);
      },
    });
  }

  createDevice() {
    console.log('created');
  }

  ngOnDestroy(): void {
    this.deviceSub.unsubscribe();
  }
}
