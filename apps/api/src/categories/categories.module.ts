import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '../devices/device.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Device])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
