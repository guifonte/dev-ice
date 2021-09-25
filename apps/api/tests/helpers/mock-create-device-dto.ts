import { CreateDeviceDTO } from '../../src/devices/create-device.dto';
import faker from 'faker';
import { mockId } from '.';

export const mockCreateDeviceDTO = (): CreateDeviceDTO => {
  const createDeviceDTO = new CreateDeviceDTO();
  createDeviceDTO.color = faker.commerce.color();
  createDeviceDTO.partNumber = mockId();
  createDeviceDTO.categoryId = mockId();
  return createDeviceDTO;
};
