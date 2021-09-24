import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const newCategory = this.categoriesRepository.create(createCategoryDTO);
    return this.categoriesRepository.save(newCategory);
  }

  async delete(id: number): Promise<void> {
    const delResult = await this.categoriesRepository.delete(id);
    if (delResult.affected === 0)
      throw new HttpException(
        'This category does not exist!',
        HttpStatus.NO_CONTENT
      );
  }
}
