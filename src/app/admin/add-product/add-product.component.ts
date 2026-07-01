import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { DataService } from 'src/app/shared/services/admin-data.service';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  categoryId: string | null = null;
  categoryName: string | null = null;

  allProducts: any[] = [];
  editProductId: string | null= null;

  addProductForm = this.fb.group({
    productName: ['', [Validators.required]],
    productDescription: ['', [Validators.required]],
    productImage: ['', [Validators.required]],
    productPrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
  });

  editProductForm= this.fb.group({
  productName:['',[Validators.required]],
  productDescription:['',[Validators.required]],
  productImage:['',[Validators.required]],
  productPrice:['',[Validators.required]]
})

modalRef?:BsModalRef

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private dataService: DataService,private modalService: BsModalService, private adminService: AdminService, private router: Router) { }

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

  handleProductEdit(product:any,template:TemplateRef<any> ):void{
    console.log("editing product",product);
    this.editProductId=product._id //to store product id here
    console.log("productID",product)
    this.editProductForm.patchValue({
      productName: product.productName,
      productDescription: product.description,
      productImage: product.imageUrl,
      productPrice: product.price
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false
    });
}


productEditSubmit(): void{
  console.log("edit form submitted");
  if(this.editProductForm.valid){
    const {productName,productDescription,productImage,productPrice}=this.editProductForm.value;
    console.log(this.editProductForm.value)

    if(this.editProductId){
      this.dataService.editProduct(this.editProductId, productName,productDescription,productImage,productPrice).subscribe({
        next: (response : any) =>{
          console.log("product updated succesfully",response);
          this.loadProductsByCategory(this.categoryId);
          this.editProductForm.reset();
          this.modalRef?.hide();

        },
        error:(error) => {
            console.error('Failed to update product:', error);
          }
      })
    }
  }
}

  goBackToCategories(): void {
    // Navigate back to the categories page
    this.router.navigate(['/admin/add-category']);
  }

}