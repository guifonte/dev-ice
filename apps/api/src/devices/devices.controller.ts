import { Controller, Get } from '@nestjs/common';
import { Device } from './device.entity';

import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Get()
  findAll(): Promise<Device[]> {
    return this.devicesService.findAll();
  }
}
