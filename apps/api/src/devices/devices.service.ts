import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceDTO } from './create-device.dto';
import { Device } from './device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>
  ) {}

  findAll(): Promise<Device[]> {
    return this.devicesRepository.find();
  }

  create(createDeviceDTO: CreateDeviceDTO): Promise<Device> {
    const partialDevice = this.devicesRepository.create(createDeviceDTO);
    console.log(partialDevice);
    return this.devicesRepository.save(partialDevice);
  }
}
