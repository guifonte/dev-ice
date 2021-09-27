import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CategoryService } from './category.service';
import { Category, CreateCategoryDTO } from '@dev-ice/domain';
import { mockCategory, mockCreateCategoryDTO, mockId } from '@dev-ice/testing';

describe('CategoryService', () => {
  let httpTestingController: HttpTestingController;
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CategoryService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCategories', () => {
    it('should return [] if server respond with []', (done) => {
      const expectedCategories: Category[] = [];

      service.getCategories().subscribe({
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

      const req = httpTestingController.expectOne('/api/categories');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCategories);
    });

    it('should return a list with one category if server respond with a list with one category', (done) => {
      const expectedCategories: Category[] = [mockCategory()];

      service.getCategories().subscribe({
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

      const req = httpTestingController.expectOne('/api/categories');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCategories);
    });
  });

  describe('createCategory', () => {
    it('should return a category if server respond with a category', (done) => {
      const mockedDTO: CreateCategoryDTO = mockCreateCategoryDTO();
      const expectedCategory: Category = { id: mockId(), ...mockedDTO };

      service.createCategory(mockedDTO).subscribe({
        next: (value) => {
          try {
            expect(value).toEqual(expectedCategory);
            done();
          } catch (error) {
            done(error);
          }
        },
        error: (err) => done(err),
      });

      const req = httpTestingController.expectOne('/api/categories');
      expect(req.request.method).toEqual('POST');
      req.flush(expectedCategory);
    });
  });
});
