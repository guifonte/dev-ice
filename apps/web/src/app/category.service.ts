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

  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  getCategories() {
    this.http.get<Category[]>(url).subscribe((res) => {
      this.categories = res;
      this.categoriesUpdated.next([...this.categories]);
    });
  }

  createCategory(createCategoryDTO: CreateCategoryDTO) {
    return this.http.post<Category[]>(url, createCategoryDTO);
  }

  deleteCategory(id: number) {
    return this.http.delete<void>(`${url}/${id}`);
  }
}
