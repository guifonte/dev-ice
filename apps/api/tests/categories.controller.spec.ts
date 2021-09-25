import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import faker from 'faker';

import { CategoriesController } from '../src/categories/categories.controller';
import { CategoriesService } from '../src/categories/categories.service';
import { mockCategory, mockId, repositoryMockFactory } from './helpers';
import { Category } from '../src/categories/category.entity';
import { Device } from '../src/devices/device.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Device),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return [] if service returns []', async () => {
      const result = Promise.resolve<Category[]>([]);
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toEqual([]);
    });

    it('should return a list with one category as well as the service', async () => {
      const mockedCat = mockCategory();
      const result = Promise.resolve<Category[]>([mockedCat]);
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toEqual([mockedCat]);
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
    it('should throw CONFLICT if service do so', async () => {
      jest.spyOn(service, 'delete').mockImplementation(() => {
        throw new HttpException('', HttpStatus.CONFLICT);
      });
      const mockedId = mockId();

      expect.assertions(3);
      try {
        await controller.deleteOne(mockedId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toHaveProperty('status', HttpStatus.CONFLICT);
        expect(service.delete).toHaveBeenCalledWith(mockedId);
      }
    });
  });
});
