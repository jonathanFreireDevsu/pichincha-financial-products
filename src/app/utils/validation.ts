import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { IdValidationService } from '../services/id-validation.service';
import { catchError, map, of } from 'rxjs';

export const dateGreaterEqualThanToday =
(item: FormGroup): ValidationErrors | null => {
    const dateReleaseControl = item.value;
    console.log(item);
    console.log(dateReleaseControl);
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
    console.log('1', dateReleaseControl?.value, dateRevisionControl?.value);
    
    if (!dateReleaseControl || !dateRevisionControl || !dateReleaseControl.value || !dateRevisionControl.value) {
        return null;
    }
    
    const dateRelease = new Date(dateReleaseControl.value);
    const dateRevision = new Date(dateRevisionControl.value);
    console.log('2', dateRelease > dateRevision);
    if (
        !(dateRelease.getFullYear() === dateRevision.getFullYear() - 1 &&
        dateRelease.getMonth() === dateRevision.getMonth() &&
        dateRelease.getDate() === dateRevision.getDate())
      ) {
      return { releaseGreatherOneYearThanRevision: true };
    }
    return null;
};

export function idExists(service: IdValidationService) {
    return (control: AbstractControl) => {
      return service.verifyId(control.value).pipe(
        map(exists => {
          // Si el ID existe, entonces el campo no es válido.
          return exists ? { idExists: true } : null;
        }),
        catchError(() => {
          console.log('error');
          return of(null);
        })
      );
    };
  }
