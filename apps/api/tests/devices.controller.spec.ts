import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Device } from '../src/devices/device.entity';
import { Category } from '../src/categories/category.entity';
import { DevicesService } from '../src/devices/devices.service';
import { DevicesController } from '../src/devices/devices.controller';
import { repositoryMockFactory } from './helpers';

describe('DevicesController', () => {
  let controller: DevicesController;
  let service: DevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        DevicesService,
        {
          provide: getRepositoryToken(Device),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Category),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
    service = module.get<DevicesService>(DevicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
