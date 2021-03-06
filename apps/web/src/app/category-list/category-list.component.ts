import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Category } from '@dev-ice/domain';
import { CategoryService } from '../category.service';

@Component({
  selector: 'dev-ice-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  loading = false;
  displayCreateModal = false;
  newCatName?: string;

  private categorySub!: Subscription;
  constructor(
    public categoryService: CategoryService,
    private titleService: Title,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.titleService.setTitle(
      'Categories | Dev-ice - Your devices organized and safe in the Cloud'
    );
  }

  ngOnInit(): void {
    this.loading = true;
    this.categorySub = this.categoryService
      .getCategoriesUpdateListener()
      .subscribe({
        next: (categories) => {
          if (this.categories.length > categories.length) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Category Deleted',
              life: 3000,
            });
          }
          this.categories = categories;
          console.log(this.categories);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    this.categoryService.getCategories();
  }

  showCreateDialog() {
    this.displayCreateModal = true;
  }

  hideCreateDialog() {
    this.newCatName = '';
    this.displayCreateModal = false;
  }

  handleDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this device?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(id);
      },
    });
  }

  private valideteForm(): string {
    if (!this.newCatName || !this.newCatName.trim())
      return 'Category Name must not be empty';
    if (this.newCatName.length > 128)
      return 'Category Name is too big (max 128)';
    return '';
  }

  createCategory(): void {
    const validateMessage = this.valideteForm();
    if (this.newCatName && !validateMessage) {
      this.categoryService.createCategory({ name: this.newCatName });
      this.hideCreateDialog();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Fiels not valid!',
        detail: validateMessage,
        life: 3000,
      });
    }
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }
}
