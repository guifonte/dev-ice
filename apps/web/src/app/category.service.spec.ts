import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { Category, CreateCategoryDTO } from '@dev-ice/domain';
import { mockCategory, mockCreateCategoryDTO, mockId } from '@dev-ice/testing';
import { CategoryService } from './category.service';
import { ErrorInterceptor } from './error-interceptor';

import { environment as env } from '../environments/environment';
import { MessageService } from 'primeng/api';

const url = env.baseURL + '/api/categories';

describe('CategoryService', () => {
  let httpTestingController: HttpTestingController;
  let service: CategoryService;
  let categoriesUpdateListener: Observable<Category[]>;
  let categorySubs: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoryService,
        MessageService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
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

      const req = httpTestingController.expectOne(url);
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

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCategories);
    });

    it('should return error to subscription', (done) => {
      categorySubs = categoriesUpdateListener.subscribe({
        next: () => {
          done('should not be here');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toEqual(404);
          expect(err.error).toEqual(emsg);
          done();
        },
      });

      service.getCategories();

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      const emsg = 'deliberate 404 error';
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
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

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedCategory);
    });

    it('should return a list with two category if category list had only a category', (done) => {
      const mockedDTO: CreateCategoryDTO = mockCreateCategoryDTO();
      const expectedCategory: Category = { id: mockId(), ...mockedDTO };
      const expectedCategory2: Category = { id: mockId(), ...mockedDTO };

      service.createCategory(mockedDTO);
      service.createCategory(mockedDTO);

      const req = httpTestingController.match(url);
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
    it('should return error to subscription', (done) => {
      const mockedDTO = mockCreateCategoryDTO();

      categorySubs = categoriesUpdateListener.subscribe({
        next: () => {
          done('should not be here');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toEqual(404);
          expect(err.error).toEqual(emsg);
          done();
        },
      });

      service.createCategory(mockedDTO);

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      const emsg = 'deliberate 404 error';
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteCategory', () => {
    it('should return empty array if server delete the only category', (done) => {
      const mockedCat = mockCategory();
      const mockedId = mockedCat.id;

      Reflect.set(service, 'categories', [mockedCat]);

      categorySubs = categoriesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual([]);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      service.deleteCategory(mockedId);

      const req = httpTestingController.expectOne(`${url}/${mockedId}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });

    it('should delete only the asked category', (done) => {
      const mockedCat = mockCategory();
      const mockedId = mockedCat.id;
      const mockedCat2 = mockCategory();

      Reflect.set(service, 'categories', [mockedCat, mockedCat2]);

      categorySubs = categoriesUpdateListener.subscribe({
        next: (value) => {
          try {
            expect(value).toEqual([mockedCat2]);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      service.deleteCategory(mockedId);

      const req = httpTestingController.expectOne(`${url}/${mockedId}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(null);
    });

    it('should return error to subscription', (done) => {
      const mockedId = mockId();

      categorySubs = categoriesUpdateListener.subscribe({
        next: () => {
          done('should not be here');
        },
        error: (err: HttpErrorResponse) => {
          expect(err.status).toEqual(404);
          expect(err.error).toEqual(emsg);
          done();
        },
      });

      service.deleteCategory(mockedId);

      const req = httpTestingController.expectOne(`${url}/${mockedId}`);
      expect(req.request.method).toEqual('DELETE');
      const emsg = 'deliberate 404 error';
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });
});
