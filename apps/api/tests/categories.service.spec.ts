import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import faker from 'faker';

import { CategoriesService } from '../src/categories/categories.service';
import { Category } from '../src/categories/category.entity';
import { CreateCategoryDTO } from '../src/categories/create-category.dto';
import {
  MockType,
  repositoryMockFactory,
  mockCategory,
  mockId,
} from './helpers';
import { HttpException, HttpStatus } from '@nestjs/common';
describe('CategoriesService', () => {
  let service: CategoriesService;
  let repositoryMock: MockType<Repository<Category>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repositoryMock = module.get(getRepositoryToken(Category));
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
      repositoryMock.delete.mockReturnValue({ raw: undefined, affected: 0 });
      expect.assertions(2);
      try {
        await service.delete(mockId());
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toHaveProperty('status', HttpStatus.NO_CONTENT);
      }
    });

    it('should do nothing on success', async () => {
      repositoryMock.delete.mockReturnValue({ raw: undefined, affected: 1 });
      await service.delete(mockId());
    });
  });
});
