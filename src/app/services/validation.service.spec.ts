import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { mockDeclarations } from '../utils/mock-declarations';
import { ValidationService } from './validation.service';

describe('DataService', () => {
  let service: ValidationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(mockDeclarations);

    service = TestBed.inject(ValidationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('DataService', () => {
    expect(service).toBeTruthy();
  });

});