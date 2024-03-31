import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormID } from 'src/app/types/form';
import { stringLenghtValidations } from 'src/app/utils/constants';
import { dateGreaterEqualThanToday, idExists, releaseGreatherOneYearThanRevision } from 'src/app/utils/validation';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private idValidationService: IdValidationService,
  ) {
    this.form = this.fb.group({
      // id: ['', [
      //   Validators.required,
      //   Validators.minLength(stringLenghtValidations.id.min),
      //   Validators.maxLength(stringLenghtValidations.id.max)
      // ]],
      id: ['', { 
        validators: [
          Validators.required,
          Validators.minLength(stringLenghtValidations.id.min),
          Validators.maxLength(stringLenghtValidations.id.max)
        ], 
        asyncValidators: [idExists(this.idValidationService)], 
        updateOn: 'blur' 
      }],
      name: ['', [
        Validators.required,
        Validators.minLength(stringLenghtValidations.name.min),
        Validators.maxLength(stringLenghtValidations.name.max)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(stringLenghtValidations.description.min),
        Validators.maxLength(stringLenghtValidations.description.max)
      ]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, Validators.minLength(7), dateGreaterEqualThanToday]],
      date_revision: ['', [Validators.required, Validators.minLength(7)]],
    }, { validator: releaseGreatherOneYearThanRevision });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    // console.log(this.form);
    if (this.form.valid) {
      console.log('Valid');
    } else {
      console.log('invalid');
    }
  }

  onReset() {
    this.form.reset();
  }
  
  getErrorMessage(id: FormID) {
    console.log(id);
    const formControls = this.form.controls;
    const formControlsErrors = formControls[id].errors;
    console.log(formControls)
    const formErrors = this.form['errors'] as any;
    if (formControlsErrors) {
      if (formControls[id].dirty || formControls[id].touched) {
        if (formControlsErrors['required']) {
          return 'El campo es requerido';
        }
        if (formControlsErrors['minlength']) {
          return `Debe tener al menos ${stringLenghtValidations[id].min} caracteres`;
        }
        if (formControlsErrors['maxlength']) {
          return `Debe tener como máximo ${stringLenghtValidations[id].max} caracteres`;
        }
        if (formControlsErrors['dateGreaterEqualThanToday']) {
          return 'Debe ser mayor o igual a la fecha actual';
        }
        if (formControlsErrors['idExists']) {
          return 'Este ID no está disponible';
        }
      }
    }
    console.log(formErrors);
    if (formErrors) {
      if (formErrors?.releaseGreatherOneYearThanRevision && id === 'date_revision') {
        return 'Debe ser un año mayor a Fecha liberación';
      }
    }
    return '';
    }
}

// import { Component } from '@angular/core';
// import { FormID, IForm } from 'src/app/types/form';
import { IdValidationService } from '../../services/id-validation.service';

// @Component({
//   selector: 'app-product-form',
//   templateUrl: './product-form.component.html',
//   styleUrls: ['./product-form.component.css']
// })
// export class ProductFormComponent {
//   constructor () {}
//   formState: IForm = {
//     'id': {
//       'value': '',
//       'error': '',
//       'title': 'ID',
//     },
//     'name': {
//       'value': '',
//       'error': '',
//       'title': 'Nombre',
//     },
//     'description': {
//       'value': '',
//       'error': '',
//       'title': 'Descripción',
//     },
//     'logo': {
//       'value': '',
//       'error': '',
//       'title': 'Logo',
//     },
//     'date_release': {
//       'value': '',
//       'error': '',
//       'title': 'Fehca liberación',
//     },
//     'date_revision': {
//       'value': '',
//       'error': '',
//       'title': 'Fecha revisión',
//     }
//   };

//   handleChange($event: {
//     id: FormID,
//     value: any
//   }) {
//     console.log($event);
//     const {id, value} = $event;
//     this.formState = {
//       ...this.formState,
//       [id]: {
//         ...this.formState[id],
//         value: value
//       }  
//     }
//   }

//   handleSave () {
//     console.log(this.formState);
//   }
// }
