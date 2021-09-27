import faker from 'faker';
import { CreateCategoryDTO } from '@dev-ice/domain';

export const mockCreateCategoryDTO = (): CreateCategoryDTO => ({
  name: faker.random.word(),
});
