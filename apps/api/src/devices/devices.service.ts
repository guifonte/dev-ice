import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/category.entity';
import { CreateDeviceDTO } from './create-device.dto';
import { Device } from './device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  findAll(): Promise<Device[]> {
    return this.devicesRepository.find({ relations: ['category'] });
  }

  async create(createDeviceDTO: CreateDeviceDTO): Promise<Device> {
    const foundCategory = await this.categoryRepository.findOne(
      createDeviceDTO.categoryId
    );
    if (!foundCategory) {
      throw new HttpException('Category does no exist', HttpStatus.BAD_REQUEST);
    }
    const device = new Device();
    device.color = createDeviceDTO.color;
    device.partNumber = createDeviceDTO.partNumber;
    device.category = foundCategory;

    return this.devicesRepository.save(device);
  }

  async delete(id: number): Promise<void> {
    const delResult = await this.devicesRepository.delete(id);
    if (delResult.affected === 0)
      throw new HttpException(
        'This device does not exist!',
        HttpStatus.NO_CONTENT
      );
  }
}
