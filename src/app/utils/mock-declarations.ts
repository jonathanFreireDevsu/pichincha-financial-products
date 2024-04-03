import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "../app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HomeComponent } from "../screens/home/home.component";
import { AddProductComponent } from "../screens/add-product/add-product.component";
import { EditProductComponent } from "../screens/edit-product/edit-product.component";
import { InputFormComponent } from "../components/shared/product-form/components/input-form/input-form.component";
import { ProductFormComponent } from "../components/shared/product-form/product-form.component";
import { ModalComponent } from "../components/modal/modal.component";
import { TableComponent } from "../screens/home/components/table/table.component";
import { NotificationComponent } from "../components/notification/notification.component";
import { ProductActionsComponent } from "../screens/home/components/product-actions/product-actions.component";

export const mockDeclarations = {
declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    EditProductComponent,
    InputFormComponent,
    ProductFormComponent,
    ModalComponent,
    TableComponent,
    NotificationComponent,
    ProductActionsComponent
],
imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientTestingModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'agregar', component: AddProductComponent},
      {path: 'editar/:id', component: EditProductComponent},
    ])
  ],
providers: [],
}