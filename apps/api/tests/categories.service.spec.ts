import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import faker from 'faker';

import {
  MockType,
  repositoryMockFactory,
  mockCategory,
  mockId,
} from './helpers';
import { CategoriesService } from '../src/categories/categories.service';
import { Category } from '../src/categories/category.entity';
import { Device } from '../src/devices/device.entity';
import { CreateCategoryDTO } from '../src/categories/create-category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repositoryMock: MockType<Repository<Category>>;
  let devRepositoryMock: MockType<Repository<Device>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CategoriesService>(CategoriesService);
    repositoryMock = module.get(getRepositoryToken(Category));
    devRepositoryMock = module.get(getRepositoryToken(Device));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a empty list if category table is empty', async () => {
      repositoryMock.find.mockReturnValue([]);
      expect(await service.findAll()).toEqual<Category[]>([]);
      expect(repositoryMock.find).toBeCalledWith();
    });

    it('should return a list with one category if it only has one category', async () => {
      const category = mockCategory();

      repositoryMock.find.mockReturnValue([category]);
      expect(await service.findAll()).toEqual<Category[]>([category]);
      expect(repositoryMock.find).toBeCalledWith();
    });

    it('should return a list with three categories if it has three categories', async () => {
      const categories: Category[] = [
        mockCategory(),
        mockCategory(),
        mockCategory(),
      ];

      repositoryMock.find.mockReturnValue(categories);
      expect(await service.findAll()).toEqual<Category[]>(categories);
      expect(repositoryMock.find).toBeCalledWith();
    });
  });

  describe('create', () => {
    it('should return the Category object with same values than the DTO, but with integer and positive id', async () => {
      const dto: CreateCategoryDTO = { name: faker.random.word() };
      const category = await service.create(dto);
      expect(category).toEqual({
        id: expect.any(Number),
        name: dto.name,
      });

      expect(category.id).toBeGreaterThan(0);
      expect(Math.floor(category.id)).toBe(category.id);
      expect(repositoryMock.create).toBeCalledWith(dto);
      expect(repositoryMock.save).toBeCalledWith(dto);
    });
  });
  describe('delete', () => {
    it('should throw NO_CONTENT if category with id not found in the database', async () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      expect.assertions(2);
      try {
        await service.delete(mockId());
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toHaveProperty('status', HttpStatus.NO_CONTENT);
      }
    });

    it('should do nothing on success', async () => {
      repositoryMock.findOne.mockReturnValue(mockCategory());
      devRepositoryMock.count.mockReturnValue(0);
      await service.delete(mockId());
    });

    it('should throw CONFLICT if is there any Device related with this category', async () => {
      repositoryMock.findOne.mockReturnValue(mockCategory());
      devRepositoryMock.count.mockReturnValue(1);
      expect.assertions(3);

      try {
        await service.delete(mockId());
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toHaveProperty('status', HttpStatus.CONFLICT);
        expect(repositoryMock.delete).toBeCalledTimes(0);
      }
    });
  });
});
