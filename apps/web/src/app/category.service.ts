import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@dev-ice/domain';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>('/api/categories');
  }
}
