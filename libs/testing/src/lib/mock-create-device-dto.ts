import { CreateDeviceDTO } from '@dev-ice/domain';
import { mockId } from './mock-id';

export const mockCreateDeviceDTO = (): CreateDeviceDTO => ({
  color: 'green',
  partNumber: mockId(),
  categoryId: mockId(),
});
