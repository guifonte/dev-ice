import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CategoryService } from './category.service';
import { Category } from '@dev-ice/domain';
import { mockCategory } from '@dev-ice/testing';

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

      service.getCategories().subscribe((categories) => {
        expect(categories).toEqual(expectedCategories);
        done();
      });

      const req = httpTestingController.expectOne('/api/categories');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCategories);
    });

    it('should return a list with one category if server respond with a list with one category', (done) => {
      const expectedCategories: Category[] = [mockCategory()];

      service.getCategories().subscribe((categories) => {
        expect(categories).toEqual(expectedCategories);
        done();
      });

      const req = httpTestingController.expectOne('/api/categories');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCategories);
    });
  });
});
