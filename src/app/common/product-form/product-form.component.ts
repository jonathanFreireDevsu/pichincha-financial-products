import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormID } from 'src/app/types/form';
import { stringLenghtValidations } from 'src/app/utils/constants';
import { dateGreaterEqualThanToday, idExists, releaseGreatherOneYearThanRevision } from 'src/app/utils/validation';
import { IdValidationService } from '../../services/id-validation.service';
import { ProductsService } from '../../services/products.service';
import { transformISODate } from 'src/app/utils/helpers';
import { ScreenMode } from 'src/app/types/screenMode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  @Input() screenMode: ScreenMode = 'add';
  constructor(
    private fb: FormBuilder,
    private idValidationService: IdValidationService,
    private productsService: ProductsService,
    private router: Router,
  ) {
    this.form = this.fb.group({});
  }


  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const data = this.form.value;
      if (this.screenMode === 'update') {
        this.productsService.updateItem(data).subscribe(
          (_) => {
            this.router.navigate([''])
          },
          (error) => {
            console.error('Hubo un error', error);
          }
        );
      } else {
        this.productsService.addItem(data).subscribe(
          (_) => {
            this.router.navigate([''])
          },
          (error) => {
            console.error('Hubo un error', error);
          }
        );
      }
    } else {
      console.log('invalid');
    }
  }

  onReset() {
    if (this.screenMode === 'add') {
      this.form.reset();
    } else {
      this.form.setValue({
        id: this.form.get('id')?.value,
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: '',
      })
    }
  }
  
  getErrorMessage(id: FormID) {
    const formControls = this.form.controls;
    const formControlsErrors = formControls[id].errors;
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
    if (formErrors) {
      if (formErrors?.releaseGreatherOneYearThanRevision && id === 'date_revision') {
        return 'Debe ser un año mayor a Fecha liberación';
      }
    }
    return '';
  }
  
  ngOnInit(): void {
    const currentProduct = this.productsService.getCurrentProduct();
    const allowIdVerify = this.screenMode === 'add' && [idExists(this.idValidationService, this.screenMode)];
    this.form = this.fb.group({
      id: ['', {
        validators: [
          Validators.required,
          Validators.minLength(stringLenghtValidations.id.min),
          Validators.maxLength(stringLenghtValidations.id.max)
        ], 
        asyncValidators: allowIdVerify, 
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
      date_release: ['', [
        Validators.required,
        Validators.minLength(7),
        dateGreaterEqualThanToday
      ]],
      date_revision: ['', [Validators.required, Validators.minLength(7)]],
    },
    { 
      validator: releaseGreatherOneYearThanRevision
    });

    if (currentProduct && this.screenMode === 'update') {
      this.form.setValue({
        id: currentProduct.id,
        name: currentProduct.name,
        description: currentProduct.description,
        logo: currentProduct.logo,
        date_release: transformISODate(currentProduct.date_release),
        date_revision: transformISODate(currentProduct.date_revision),
      })
    }
    
  }
}
