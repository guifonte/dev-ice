import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CreateCategoryDTO } from '@dev-ice/domain';
import { Subject } from 'rxjs';

const url = '/api/categories';

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
    this.http.get<Category[]>(url).subscribe((res) => {
      this.categories = res;
      this.updateCategoriesUpdated();
    });
  }

  createCategory(createCategoryDTO: CreateCategoryDTO) {
    this.http.post<Category>(url, createCategoryDTO).subscribe((res) => {
      this.categories = [...this.categories, res];
      this.updateCategoriesUpdated();
    });
  }

  deleteCategory(id: number) {
    this.http.delete<void>(`${url}/${id}`).subscribe(() => {
      this.categories = this.categories.filter((cat) => cat.id !== id);
      this.updateCategoriesUpdated();
    });
  }
}
