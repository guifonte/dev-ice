import faker from 'faker';
import { Category } from '../../src/categories/category.entity';

export const mockCategory = (): Category => {
  const category = new Category();
  category.id = Math.floor(Math.random() * 1000000);
  category.name = faker.random.word();
  return category;
};
