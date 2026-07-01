import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {path: 'categories', component: CategoriesComponent},
  {path: 'products', component: ProductsComponent},
]

@NgModule({
  declarations: [
    CategoriesComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CatalogModule { }
