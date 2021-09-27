import { Device } from '@dev-ice/domain';
import { mockCategory } from './mock-category';
import { mockId } from './mock-id';

export const mockDevice = (): Device => ({
  id: mockId(),
  color: 'green',
  partNumber: mockId(),
  category: mockCategory(),
});
