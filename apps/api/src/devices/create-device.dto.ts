import { IsInt, Length, Matches, Max, Min } from 'class-validator';

export class CreateDeviceDTO {
  @Length(1, 16)
  @Matches(/^[a-zA-Z]*$/, { message: '$property must contain only letters' })
  color: string;

  @Min(1)
  @Max(4294967295)
  @IsInt()
  partNumber: number;

  @IsInt()
  categoryId: number;
}
