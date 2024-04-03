import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormIDType } from 'src/app/models/form.types';
import { ScreenModeType } from 'src/app/models/screen-mode.types';
import { NotificationService } from '../../notification/notification.service';
import { ProductFormService } from './product-form.service';

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
    private notificationService: NotificationService,
    private productFormService: ProductFormService,
  ) {
    this.form = this.fb.group({});
  }


  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const data = this.form.value;
      if (this.screenMode === 'update') {
        this.productFormService.handleSubmitUpdate(data);
      } else {
        this.productFormService.handleSubmitAdd(data);
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
    return this.productFormService.getErrorMessage(
      this.form,
      id
    );
  }
  
  ngOnInit(): void {
    this.form = this.productFormService.populateForm(this.screenMode);
  }
}
