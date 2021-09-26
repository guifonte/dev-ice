import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Device } from '../src/devices/device.entity';
import { Category } from '../src/categories/category.entity';
import { DevicesService } from '../src/devices/devices.service';
import { DevicesController } from '../src/devices/devices.controller';
import { mockDevice, mockId, repositoryMockFactory } from './helpers';
import { HttpException, HttpStatus } from '@nestjs/common';

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

  describe('findAll', () => {
    it('should return [] if service returns []', async () => {
      const result = Promise.resolve<Device[]>([]);
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toEqual([]);
    });

    it('should return a list with one device as well as the service', async () => {
      const mockedDev = mockDevice();
      const result = Promise.resolve<Device[]>([mockedDev]);
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toEqual([mockedDev]);
    });
  });

  describe('delete', () => {
    it('should return void if service returns void', async () => {
      const result = Promise.resolve<void>(undefined);
      jest.spyOn(service, 'delete').mockImplementation(() => result);

      const mockedId = mockId();
      expect(await controller.deleteOne(mockedId)).toEqual(undefined);
      expect(service.delete).toHaveBeenCalledWith(mockedId);
    });

    it('should throw NO_CONTENT if id does not exists', async () => {
      jest.spyOn(service, 'delete').mockImplementation(() => {
        throw new HttpException('', HttpStatus.NO_CONTENT);
      });
      const mockedId = mockId();

      expect.assertions(3);
      try {
        await controller.deleteOne(mockedId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toHaveProperty('status', HttpStatus.NO_CONTENT);
        expect(service.delete).toHaveBeenCalledWith(mockedId);
      }
    });
  });
});
