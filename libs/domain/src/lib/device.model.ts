import { Category } from './category.model';

export interface Device {
  id: number;
  color: string;
  partNumber: number;
  category: Category;
}
