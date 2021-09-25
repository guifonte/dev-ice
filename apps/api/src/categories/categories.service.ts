import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../devices/device.entity';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const newCategory = this.categoriesRepository.create(createCategoryDTO);
    return this.categoriesRepository.save(newCategory);
  }

  async delete(id: number): Promise<void> {
    const foundCategory = await this.categoriesRepository.findOne(id);
    if (!foundCategory) {
      throw new HttpException('Category does not exist', HttpStatus.NO_CONTENT);
    }

    const deviceCount = await this.devicesRepository.count({
      where: { categoryId: foundCategory.id },
    });
    if (deviceCount !== 0) {
      throw new HttpException(
        'Category cannot be deleted! There are devices in it.',
        HttpStatus.CONFLICT
      );
    }
    await this.categoriesRepository.delete(id);
  }
}
