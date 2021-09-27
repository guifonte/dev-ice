import faker from 'faker';
import { mockId } from './mock-id';
import { Category } from '@dev-ice/domain';

export const mockCategory = (): Category => ({
  id: mockId(),
  name: faker.random.word(),
});
