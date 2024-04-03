import { TestBed } from '@angular/core/testing';
import { mockDeclarations } from '../utils/mock-declarations';
import { ValidationService } from './validation.service';
import { FormControl, FormGroup } from '@angular/forms';

describe('Validation service', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule(mockDeclarations);

    service = TestBed.inject(ValidationService);
  });

  describe('dateGreaterEqualThanToday', () => {
    it('should validate future dates as correct', () => {
      const dateRelease = new Date();
      dateRelease.setDate(dateRelease.getDate() + 2);
      const formGroup = {'value': dateRelease}
      expect(service.dateGreaterEqualThanToday(formGroup as FormGroup)).toBeNull();
    });
  
    it('should invalidate past dates', () => {
      const dateRelease = new Date();
      dateRelease.setDate(dateRelease.getDate() - 1);
      const formGroup = {'value': dateRelease}
      expect(service.dateGreaterEqualThanToday(formGroup as FormGroup)).toEqual({ dateGreaterEqualThanToday: true });
    });
  });

  describe('releaseGreatherOneYearThanRevision', () => {
    it('return null if date_revision is exactly one year more than date_release', () => {
      const dateReleaseControl = new FormControl('2024-01-01');
      const dateRevisionControl = new FormControl('2025-01-01');
      
      const formGroup = new FormGroup({
        date_release: dateReleaseControl,
        date_revision: dateRevisionControl,

      });
      expect(service.releaseGreatherOneYearThanRevision(formGroup)).toBeNull();
    });

    it('return releaseGreatherOneYearThanRevision if date_revision is not exactly one year more than date_release', () => {
      const dateReleaseControl = new FormControl('2024-01-01');
      const dateRevisionControl = new FormControl('2025-01-02');
      
      const formGroup = new FormGroup({
        date_release: dateReleaseControl,
        date_revision: dateRevisionControl,

      });
      expect(service.releaseGreatherOneYearThanRevision(formGroup)).toEqual({ releaseGreatherOneYearThanRevision: true });
    });

  });

  describe('isValidUrl', () => {
    it('return null for valid URL', () => {
      const control = new FormControl('https://www.google.com');
      expect(service.isValidUrl(control)).toBeNull();
    });
  
    it('should return an error object for invalid URL', () => {
      const control = new FormControl('image');
      expect(service.isValidUrl(control)).toEqual({ invalidUrl: true });
    });
  });

});