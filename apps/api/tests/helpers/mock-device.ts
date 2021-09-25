import faker from 'faker';
import { mockCategory, mockId } from '.';
import { Device } from '../../src/devices/device.entity';

export const mockDevice = (): Device => {
  const device = new Device();
  device.id = mockId();
  device.color = faker.commerce.color();
  device.partNumber = mockId();
  device.category = mockCategory();
  return device;
};
