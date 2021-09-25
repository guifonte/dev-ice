import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDTO } from './create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriesService.delete(id);
  }

  @Post()
  create(@Body() createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    return this.categoriesService.create(createCategoryDTO);
  }
}
