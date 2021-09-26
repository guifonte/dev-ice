import { MinLength } from 'class-validator';
export class CreateCategoryDTO {
  @MinLength(1)
  name: string;
}
