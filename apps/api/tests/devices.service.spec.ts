import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { DevicesService } from '../src/devices/devices.service';
import { Device } from '../src/devices/device.entity';
import { MockType, repositoryMockFactory } from './helpers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockDevice } from './helpers/mock-device';

describe('DevicesService', () => {
  let service: DevicesService;
  let repositoryMock: MockType<Repository<Device>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        {
          provide: getRepositoryToken(Device),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
    repositoryMock = module.get(getRepositoryToken(Device));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a empty list if device table is empty', async () => {
      repositoryMock.find.mockReturnValue([]);
      expect(await service.findAll()).toEqual<Device[]>([]);
      expect(repositoryMock.find).toBeCalledWith();
    });

    it('should return a list with one device if it only has one device', async () => {
      const device = mockDevice();

      repositoryMock.find.mockReturnValue([device]);
      expect(await service.findAll()).toEqual<Device[]>([device]);
      expect(repositoryMock.find).toBeCalledWith();
    });

    it('should return a list with three devices if it has three devices', async () => {
      const devices: Device[] = [mockDevice(), mockDevice(), mockDevice()];

      repositoryMock.find.mockReturnValue(devices);
      expect(await service.findAll()).toEqual<Device[]>(devices);
      expect(repositoryMock.find).toBeCalledWith();
    });
  });
});
