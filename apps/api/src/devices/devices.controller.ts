import { Controller } from '@nestjs/common';

import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}
}
