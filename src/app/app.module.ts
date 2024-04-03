import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './screens/add-product/add-product.component';
import { EditProductComponent } from './screens/edit-product/edit-product.component';
import { InputFormComponent } from './components/shared/product-form/components/input-form/input-form.component';
import { ProductFormComponent } from './components/shared/product-form/product-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';
import { TableComponent } from './screens/home/components/table/table.component';
import { ProductActionsComponent } from './screens/home/components/product-actions/product-actions.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    EditProductComponent,
    InputFormComponent,
    ProductFormComponent,
    ModalComponent,
    NotificationComponent,
    TableComponent,
    ProductActionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'agregar', component: AddProductComponent},
      {path: 'editar/:id', component: EditProductComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
