import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Category } from '@dev-ice/domain';
import { CategoryService } from '../category.service';

@Component({
  selector: 'dev-ice-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];

  private categorySub!: Subscription;
  constructor(
    public categoryService: CategoryService,
    private titleService: Title
  ) {
    this.titleService.setTitle(
      'Categories | Dev-ice - Your devices organized and safe in the Cloud'
    );
  }

  ngOnInit(): void {
    this.categorySub = this.categoryService
      .getCategoriesUpdateListener()
      .subscribe((categories) => {
        this.categories = categories;
        console.log(this.categories);
      });
    this.categoryService.getCategories();
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }
}
