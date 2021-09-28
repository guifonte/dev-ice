import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Category, Device } from '@dev-ice/domain';
import { DeviceService } from '../device.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryService } from '../category.service';

@Component({
  selector: 'dev-ice-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit, OnDestroy {
  devices: Device[] = [];
  categories: Category[] = [];

  loading = false;
  displayCreateModal = false;
  newColor = '';
  newPartNumber!: number;
  selectedCategory!: Category;
  private deviceSub!: Subscription;
  private categorySub!: Subscription;

  constructor(
    public deviceService: DeviceService,
    private titleService: Title,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private categoryService: CategoryService
  ) {
    this.titleService.setTitle(
      'Devices | Dev-ice - Your devices organized and safe in the Cloud'
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
    this.categorySub = this.categoryService
      .getCategoriesUpdateListener()
      .subscribe((categories) => (this.categories = categories));
    this.categoryService.getCategories();
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
    this.deviceService.createDevice({
      partNumber: this.newPartNumber,
      color: this.newColor,
      categoryId: this.selectedCategory.id,
    });
  }

  showCreateDialog() {
    this.displayCreateModal = true;
  }

  hideCreateDialog() {
    this.displayCreateModal = false;
  }
  ngOnDestroy(): void {
    this.deviceSub.unsubscribe();
    this.categorySub.unsubscribe();
  }
}
