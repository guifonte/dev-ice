import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import faker from 'faker';
import { CategoriesService } from '../src/categories/categories.service';
import { Category } from '../src/categories/category.entity';
import { MockType, repositoryMockFactory } from './helpers/mock-repository';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repositoryMock: MockType<Repository<Category>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          // useValue: categoryRepositoryStub
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
      const category: Category = {
        id: 1,
        name: 'loremipsulum',
      };
      repositoryMock.find.mockReturnValue([category]);
      expect(await service.findAll()).toEqual<Category[]>([category]);
      expect(repositoryMock.find).toBeCalledWith();
    });

    it('should return a list with three categories if it has three categories', async () => {
      const categories: Category[] = [
        {
          id: 1,
          name: 'loremipsulum',
        },
        {
          id: 2,
          name: 'loremipsulum',
        },
        {
          id: 3,
          name: 'loremipsulum',
        },
      ];

      repositoryMock.find.mockReturnValue(categories);
      expect(await service.findAll()).toEqual<Category[]>(categories);
      expect(repositoryMock.find).toBeCalledWith();
    });
  });
});
