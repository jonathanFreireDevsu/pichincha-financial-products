import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IdValidationService } from '../services/id-validation.service';
import { Observable, catchError, map, of } from 'rxjs';

export const dateGreaterEqualThanToday =
(item: FormGroup): ValidationErrors | null => {
    const dateReleaseControl = item.value;
    if (!dateReleaseControl) {
        return null;
    }
  
    const dateRelease = new Date(dateReleaseControl);
    const today = new Date();
    if (today >= dateRelease) {
      return { dateGreaterEqualThanToday: true };
    }
    return null;
};

export const releaseGreatherOneYearThanRevision =
(formGroup: FormGroup): ValidationErrors | null => {
    const dateReleaseControl = formGroup.get('date_release');
    const dateRevisionControl = formGroup.get('date_revision');

    if (!dateReleaseControl || !dateRevisionControl || !dateReleaseControl.value || !dateRevisionControl.value) {
        return null;
    }
    
    const dateRelease = new Date(dateReleaseControl.value);
    const dateRevision = new Date(dateRevisionControl.value);
    if (
        !(dateRelease.getFullYear() === dateRevision.getFullYear() - 1 &&
        dateRelease.getMonth() === dateRevision.getMonth() &&
        dateRelease.getDate() === dateRevision.getDate())
      ) {
      return { releaseGreatherOneYearThanRevision: true };
    }
    return null;
};

export const  validateUrl = (control: AbstractControl): ValidationErrors | null => {
  const urlRegex = /^https?:\/\/.+/;
  const valid = urlRegex.test(control.value);
  return valid ? null : { 'invalidUrl': true };
}

export const idExists = (service: IdValidationService, screenMode: string): ValidationErrors | null => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (screenMode !== 'add' || !control.value) {
      return of(null);
    }

    return service.verifyId(control.value).pipe(
      map(exists => {
        return exists ? { idExists: true } : null;
      }),
      catchError(() => of({ idExists: true }))
    );
  };
};
