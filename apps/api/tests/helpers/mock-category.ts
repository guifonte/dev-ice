import faker from 'faker';
import { mockId } from '.';
import { Category } from '../../src/categories/category.entity';

export const mockCategory = (): Category => {
  const category = new Category();
  category.id = mockId();
  category.name = faker.random.word();
  return category;
};
