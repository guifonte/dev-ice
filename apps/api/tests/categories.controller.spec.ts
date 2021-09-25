import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../src/categories/categories.controller';
import { CategoriesService } from '../src/categories/categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockCategory, repositoryMockFactory } from './helpers';
import { Category } from '../src/categories/category.entity';
import { Device } from '../src/devices/device.entity';

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
});
