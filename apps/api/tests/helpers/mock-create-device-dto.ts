import { CreateDeviceDTO } from '../../src/devices/create-device.dto';
import { mockId } from '.';

export const mockCreateDeviceDTO = (): CreateDeviceDTO => {
  const createDeviceDTO = new CreateDeviceDTO();
  createDeviceDTO.color = 'green';
  createDeviceDTO.partNumber = mockId();
  createDeviceDTO.categoryId = mockId();
  return createDeviceDTO;
};
