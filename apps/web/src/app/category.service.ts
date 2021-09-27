import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category, CreateCategoryDTO } from '@dev-ice/domain';

import { environment as env } from '../environments/environment';

const url = env.baseURL + '/api/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [];
  private categoriesUpdated = new Subject<Category[]>();

  constructor(private http: HttpClient) {}

  private updateCategoriesUpdated() {
    this.categoriesUpdated.next([...this.categories]);
  }

  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  getCategories() {
    this.http.get<Category[]>(url).subscribe({
      next: (res) => {
        this.categories = res;
        this.updateCategoriesUpdated();
      },
      error: (err) => {
        this.categoriesUpdated.error(err);
      },
    });
  }

  createCategory(createCategoryDTO: CreateCategoryDTO) {
    this.http.post<Category>(url, createCategoryDTO).subscribe({
      next: (res) => {
        this.categories = [...this.categories, res];
        this.updateCategoriesUpdated();
      },
      error: (err) => {
        this.categoriesUpdated.error(err);
      },
    });
  }

  deleteCategory(id: number) {
    this.http.delete<void>(`${url}/${id}`).subscribe({
      next: () => {
        this.categories = this.categories.filter((cat) => cat.id !== id);
        this.updateCategoriesUpdated();
      },
      error: (err) => {
        this.categoriesUpdated.error(err);
      },
    });
  }
}
