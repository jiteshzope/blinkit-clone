import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categories: any[] = [];

  addCategoryForm = this.fb.group({
    categoryName: ['', [Validators.required]],
    categoryDescription: ['', [Validators.required]],
    categoryImage: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private dataService: DataService) { }

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

}
