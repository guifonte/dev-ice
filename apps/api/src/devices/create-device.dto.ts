import { IsInt } from 'class-validator';

export class CreateDeviceDTO {
  color: string;

  partNumber: number;

  @IsInt()
  categoryId: number;
}
