import { Length } from 'class-validator';
import { IsNotBlank } from '../shared/validators/is-not-blank';

export class CreateCategoryDTO {
  @Length(1, 128)
  @IsNotBlank()
  name: string;
}
