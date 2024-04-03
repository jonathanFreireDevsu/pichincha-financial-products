import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddProductScreenComponent } from './add-product-screen/add-product-screen.component';
import { EditProductScreenComponent } from './edit-product-screen/edit-product-screen.component';
import { InputFormComponent } from './common/input-form/input-form.component';
import { ProductFormComponent } from './common/product-form/product-form.component';
import { ModalComponent } from './modal/modal.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    AddProductScreenComponent,
    EditProductScreenComponent,
    InputFormComponent,
    ProductFormComponent,
    ModalComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: MainScreenComponent},
      {path: 'agregar', component: AddProductScreenComponent},
      {path: 'editar/:id', component: EditProductScreenComponent},
    ])
  ],
  // exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
