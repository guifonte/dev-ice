import { Length } from 'class-validator';
export class CreateCategoryDTO {
  @Length(1, 128)
  name: string;
}
