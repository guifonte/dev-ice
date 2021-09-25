import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { DevicesService } from '../src/devices/devices.service';
import { Device } from '../src/devices/device.entity';
import {
  mockCategory,
  mockId,
  MockType,
  repositoryMockFactory,
} from './helpers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockDevice } from './helpers/mock-device';
import { CreateDeviceDTO } from '../src/devices/create-device.dto';
import { mockCreateDeviceDTO } from './helpers/mock-create-device-dto';
import { Category } from '../src/categories/category.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('DevicesService', () => {
  let service: DevicesService;
  let repositoryMock: MockType<Repository<Device>>;
  let catRepositoryMock: MockType<Repository<Category>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<DevicesService>(DevicesService);
    repositoryMock = module.get(getRepositoryToken(Device));
    catRepositoryMock = module.get(getRepositoryToken(Category));
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

  describe('create', () => {
    it('should return the Device object with same values as the DTO, but with id and category object complete', async () => {
      const dto: CreateDeviceDTO = mockCreateDeviceDTO();
      const category: Category = { ...mockCategory(), id: dto.categoryId };
      repositoryMock.save.mockReturnValue({
        id: mockId(),
        partNumber: dto.partNumber,
        color: dto.color,
        category,
      });

      catRepositoryMock.findOne.mockReturnValue(category);
      const device = await service.create(dto);
      expect(device).toEqual({
        id: expect.any(Number),
        partNumber: dto.partNumber,
        color: dto.color,
        category: {
          id: dto.categoryId,
          name: expect.any(String),
        },
      });
      expect(device.id).toBeGreaterThan(0);
      expect(Math.floor(device.id)).toBe(device.id);
      expect(repositoryMock.create).toBeCalledWith(dto);
      expect(repositoryMock.save).toBeCalledWith(dto);
    });
    it('should throw BAD_REQUEST if category does not exist', async () => {
      const dto: CreateDeviceDTO = mockCreateDeviceDTO();
      catRepositoryMock.findOne.mockReturnValue(undefined);

      expect.assertions(4);
      try {
        await service.create(dto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toHaveProperty('status', HttpStatus.BAD_REQUEST);
        expect(catRepositoryMock.findOne).toBeCalledWith(dto.categoryId);
        expect(repositoryMock.save).toBeCalledTimes(0);
      }
    });
  });

  describe('delete', () => {
    it('should throw NO_CONTENT if device for the given id does not exists in the database', async () => {
      repositoryMock.delete.mockReturnValue({ raw: undefined, affected: 0 });
      expect.assertions(2);
      try {
        await service.delete(mockId());
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toHaveProperty('status', HttpStatus.NO_CONTENT);
      }
    });

    it('should return nothing on success', async () => {
      repositoryMock.delete.mockReturnValue({ raw: undefined, affected: 1 });
      await service.delete(mockId());
    });
  });
});
