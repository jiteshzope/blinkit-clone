import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  categoryId: string | null = null;
  categoryName: string | null = null;

  allProducts: any[] = [];

  addProductForm = this.fb.group({
    productName: ['', [Validators.required]],
    productDescription: ['', [Validators.required]],
    productImage: ['', [Validators.required]],
    productPrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private dataService: DataService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.categoryName = this.adminService.selectedCategory?.categoryName || null;
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.loadProductsByCategory(this.categoryId);
    });
  }

  handleAddProduct(): void {
    if (this.addProductForm.valid) {
      const { productName, productDescription, productImage, productPrice } = this.addProductForm.value;
      if (this.categoryId) {
        this.dataService.addProduct(this.categoryId, productName, productDescription, productImage, productPrice)
          .subscribe({
            next: (response) => {
              // Handle the response if needed
              this.loadProductsByCategory(this.categoryId);
            },
            error: (error) => {
              // Handle the error if needed
            }
          });
      }
    }
  }

  loadProductsByCategory(categoryId: string | null): void {
    if (categoryId) {
      this.dataService.getProductsByCategory(categoryId)
        .subscribe({
          next: (response: any) => {
            this.allProducts = response.products || [];
          },
          error: (error) => {
            // Handle the error if needed
          }
        });
    }
  }

}