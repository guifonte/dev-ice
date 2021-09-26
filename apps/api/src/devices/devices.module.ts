import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';

@Module({
  controllers: [DevicesController],
})
export class DevicesModule {}
