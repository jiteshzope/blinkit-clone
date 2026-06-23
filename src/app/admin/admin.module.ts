import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

const adminRoutes = [
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'add-product/:categoryId', component: AddProductComponent },
  { path: 'login', component: AdminLoginComponent }
]

@NgModule({
  declarations: [
    AddCategoryComponent,
    AddProductComponent,
    AdminLoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
