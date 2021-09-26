import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDeviceDTO } from './create-device.dto';
import { Device } from './device.entity';

import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Get()
  findAll(): Promise<Device[]> {
    return this.devicesService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.devicesService.delete(id);
  }
  @Post()
  create(
    @Body(new ValidationPipe()) createDeviceDTO: CreateDeviceDTO
  ): Promise<Device> {
    return this.devicesService.create(createDeviceDTO);
  }
}
