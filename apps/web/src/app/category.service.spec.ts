import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CategoryService } from './category.service';
import { Category, CreateCategoryDTO } from '@dev-ice/domain';
import { mockCategory, mockCreateCategoryDTO, mockId } from '@dev-ice/testing';
import { Observable, Subscription } from 'rxjs';

describe('CategoryService', () => {
  let httpTestingController: HttpTestingController;
  let service: CategoryService;
  let categoriesUpdateListener: Observable<Category[]>;
  let categorySubs: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CategoryService);
    categoriesUpdateListener = service.getCategoriesUpdateListener();
  });

  afterEach(() => {
    httpTestingController.verify();
    categorySubs?.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCategories', () => {
    it('should return [] if server respond with []', (done) => {
      const expectedCategories: Category[] = [];
      categorySubs = categoriesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual(expectedCategories);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      service.getCategories();

      const req = httpTestingController.expectOne('/api/categories');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCategories);
    });

    it('should return a list with one category if server respond with a list with one category', (done) => {
      const expectedCategories: Category[] = [mockCategory()];
      categorySubs = categoriesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual(expectedCategories);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      service.getCategories();

      const req = httpTestingController.expectOne('/api/categories');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCategories);
    });
  });

  describe('createCategory', () => {
    it('should return a list with one category if categories list is empty', (done) => {
      const mockedDTO: CreateCategoryDTO = mockCreateCategoryDTO();
      const expectedCategory: Category = { id: mockId(), ...mockedDTO };

      categorySubs = categoriesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual([expectedCategory]);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      service.createCategory(mockedDTO);

      const req = httpTestingController.expectOne('/api/categories');
      expect(req.request.method).toEqual('POST');
      req.flush(expectedCategory);
    });

    it('should return a list with two category if category list had only a category', (done) => {
      const mockedDTO: CreateCategoryDTO = mockCreateCategoryDTO();
      const expectedCategory: Category = { id: mockId(), ...mockedDTO };
      const expectedCategory2: Category = { id: mockId(), ...mockedDTO };

      service.createCategory(mockedDTO);
      service.createCategory(mockedDTO);

      const req = httpTestingController.match('/api/categories');
      expect(req.length).toBe(2);
      expect(req[0].request.method).toEqual('POST');
      req[0].flush(expectedCategory);

      categorySubs = categoriesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual([expectedCategory, expectedCategory2]);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      req[1].flush(expectedCategory2);
    });
  });

  describe('deleteCategory', () => {
    it('should return nothing if server delete the category', (done) => {
      const mockedId = mockId();
      service.deleteCategory(mockedId).subscribe({
        next: (value) => {
          try {
            expect(value).toEqual(null);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      const req = httpTestingController.expectOne(
        `/api/categories/${mockedId}`
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });
  });
});
