import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CreateCategoryDTO } from '@dev-ice/domain';

const url = '/api/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(url);
  }

  createCategory(createCategoryDTO: CreateCategoryDTO) {
    return this.http.post<Category[]>(url, createCategoryDTO);
  }

  deleteCategory(id: number) {
    return this.http.delete<void>(`${url}/${id}`);
  }
}
