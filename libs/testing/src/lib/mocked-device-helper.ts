import { CreateDeviceDTO, Device } from '@dev-ice/domain';

export const fromMockedDeviceToMockedCreateDeviceDTO = (
  device: Device
): CreateDeviceDTO => {
  return {
    categoryId: device.category.id,
    color: device.color,
    partNumber: device.partNumber,
  };
};
