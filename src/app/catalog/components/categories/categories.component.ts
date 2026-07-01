import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogDataService } from 'src/app/shared/services/catalog-data.service';
import { CatalogHelperService } from 'src/app/shared/services/catalog-helper.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any[] = [];

  constructor(private catalogService: CatalogDataService, private catalogHelperService: CatalogHelperService, private router: Router) { }

  ngOnInit(): void {
    this.catalogService.getCategories().subscribe((data: any) => {
      this.categories = data.categories;
    });
  }

  navigateToProducts(category: any): void {
    // Store the selected category in the helper service
    this.catalogHelperService.userSelectedCategory = category;
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    // Navigate to the products page for the selected category
    this.router.navigate(['/catalog/products']);
  }

}
