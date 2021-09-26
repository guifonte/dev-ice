import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Device } from './device.entity';
import { Category } from '../categories/category.entity';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Category])],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
