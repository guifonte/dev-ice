import { IsInt, Min } from 'class-validator';

export class CreateDeviceDTO {
  color: string;

  @Min(1)
  @IsInt()
  partNumber: number;

  @IsInt()
  categoryId: number;
}
