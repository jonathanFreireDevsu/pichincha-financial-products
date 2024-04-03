import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormIDType } from 'src/app/models/form.types';
import { stringLenghtValidations } from 'src/app/constants/string-lenght-validations';
// import { dateGreaterEqualThanToday, idExists, releaseGreatherOneYearThanRevision, validateUrl } from 'src/app/utils/validation';
import { ValidationService } from '../../../services/validation.service';
import { ProductsService } from '../../../services/products.service';
import { transformISODate } from 'src/app/utils/format.utils';
import { ScreenModeType } from 'src/app/models/screen-mode.types';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification/notification.service';
import { ProductStateService } from 'src/app/services/product-state.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  @Input() screenMode: ScreenModeType = 'add';
  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private productsService: ProductsService,
    private router: Router,
    private notificationService: NotificationService,
    private productStateService: ProductStateService,
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
            this.notificationService.showNotification(
              'Se ha actualizado el producto con éxito',
              'done'
            );
          },
          (_) => {
            this.notificationService.showNotification(
              'Hubo un error al intentar añadir el producto',
              'error'
            );
          }
        );
      } else {
        this.productsService.addItem(data).subscribe(
          (_) => {
            this.router.navigate([''])
            this.notificationService.showNotification(
              'Se ha añadido el producto con éxito',
              'done'
            );
          },
          (_) => {
            this.notificationService.showNotification(
              'Hubo un error al intentar añadir el producto',
              'error'
            );
          }
        );
      }
    } else {
      this.notificationService.showNotification('Corrige todos los campos', 'error');
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
  
  getErrorMessage(id: FormIDType) {
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
        if (formControlsErrors['invalidUrl']) {
          return 'URL no válido';
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
    const selectedProduct = this.productStateService.getSelectedProduct();
    const allowIdVerify = this.screenMode === 'add' && [this.validationService.idExists(this.screenMode)];
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
      logo: ['', [Validators.required, this.validationService.isValidUrl]],
      date_release: ['', [
        Validators.required,
        Validators.minLength(7),
        this.validationService.dateGreaterEqualThanToday
      ]],
      date_revision: ['', [Validators.required, Validators.minLength(7)]],
    },
    { 
      validator: this.validationService.releaseGreatherOneYearThanRevision
    });

    if (selectedProduct && this.screenMode === 'update') {
      this.form.setValue({
        id: selectedProduct.id,
        name: selectedProduct.name,
        description: selectedProduct.description,
        logo: selectedProduct.logo,
        date_release: transformISODate(selectedProduct.date_release),
        date_revision: transformISODate(selectedProduct.date_revision),
      })
    }
    
  }
}