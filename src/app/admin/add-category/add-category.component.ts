import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/shared/services/admin.service';
import { DataService } from 'src/app/shared/services/admin-data.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  modalRef?: BsModalRef;
  editCategoryId: string | null = null;

  categories: any[] = [];

  addCategoryForm = this.fb.group({
    categoryName: ['', [Validators.required]],
    categoryDescription: ['', [Validators.required]],
    categoryImage: ['', [Validators.required]]
  });

  editCategoryForm = this.fb.group({
    categoryName: ['', [Validators.required]],
    categoryDescription: ['', [Validators.required]],
    categoryImage: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private dataService: DataService, private modalService: BsModalService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.dataService.getCategories().subscribe({
      next: (response : any) => {
        this.categories = response.categories;
      },
      error: (error) => {
        console.error('Failed to load categories:', error);
      }
    });
  }

  handleEditCategory(category: any, template: TemplateRef<any>): void {
    // Implement the logic to edit the category
    console.log('Editing category:', category);
    this.editCategoryId = category._id; // Store the ID of the category being edited
    this.editCategoryForm.patchValue({
      categoryName: category.categoryName,
      categoryDescription: category.description,
      categoryImage: category.imageUrl
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false
    });
  }

  onSubmit(): void {
    if (this.addCategoryForm.valid) {
      const { categoryName, categoryDescription, categoryImage } = this.addCategoryForm.value;

      this.dataService.addCategory(categoryName, categoryDescription, categoryImage).subscribe({
        next: (response : any) => {
          console.log('Category added successfully:', response);
          this.loadCategories(); // Refresh the categories list after adding a new category
          this.addCategoryForm.reset(); // Reset the form after successful submission
        },
        error: (error) => {
          console.error('Failed to add category:', error);
        }
      });

    }
  }

  onEditSubmit(): void {
    console.log('Edit form submitted');
    if (this.editCategoryForm.valid) {
      const { categoryName, categoryDescription, categoryImage } = this.editCategoryForm.value;

      if (this.editCategoryId) {
        this.dataService.editCategory(this.editCategoryId, categoryName, categoryDescription, categoryImage).subscribe({
          next: (response : any) => {
            console.log('Category updated successfully:', response);
            this.loadCategories(); // Refresh the categories list after updating a category
            this.editCategoryForm.reset(); // Reset the form after successful update
            this.modalRef?.hide(); // Close the modal after successful update
          },
          error: (error) => {
            console.error('Failed to update category:', error);
          }
        });
      }
    }
  }

  handleNavigateToProductList(category: any): void {
    // Implement the logic to navigate to the product list for the selected category
    console.log('Navigating to product list for category ID:', category._id);
    this.adminService.selectedCategory = category;
    this.router.navigate(['/admin','add-product', category._id]);
  }

}
