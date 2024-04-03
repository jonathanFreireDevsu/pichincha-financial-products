import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "../app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MainScreenComponent } from "../main-screen/main-screen.component";
import { AddProductScreenComponent } from "../add-product-screen/add-product-screen.component";
import { EditProductScreenComponent } from "../edit-product-screen/edit-product-screen.component";
import { InputFormComponent } from "../common/input-form/input-form.component";
import { ProductFormComponent } from "../common/product-form/product-form.component";
import { ModalComponent } from "../modal/modal.component";

export const mockDeclarations = {
declarations: [
    AppComponent,
    MainScreenComponent,
    AddProductScreenComponent,
    EditProductScreenComponent,
    InputFormComponent,
    ProductFormComponent,
    ModalComponent,
],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientTestingModule,
    RouterModule.forRoot([
      {path: '', component: MainScreenComponent},
      {path: 'agregar', component: AddProductScreenComponent},
      {path: 'editar/:id', component: EditProductScreenComponent},
    ])
  ],
providers: [],
}