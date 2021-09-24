import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import faker from 'faker';

import { CategoriesService } from '../src/categories/categories.service';
import { Category } from '../src/categories/category.entity';
import { CreateCategoryDTO } from '../src/categories/create-category.dto';
import { MockType, repositoryMockFactory, mockCategory } from './helpers';
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
      expect(repositoryMock.create).toBeCalledWith(dto);
      expect(repositoryMock.save).toBeCalledWith(dto);
    });
  });
});
