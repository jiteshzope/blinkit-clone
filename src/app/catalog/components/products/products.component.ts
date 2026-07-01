import { Component, OnInit } from '@angular/core';
import { CatalogDataService } from 'src/app/shared/services/catalog-data.service';
import { CatalogHelperService } from 'src/app/shared/services/catalog-helper.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  categoryName: string = '';

  constructor(private catalogHelperService: CatalogHelperService, private catalogDataService: CatalogDataService) { }

  ngOnInit(): void {
    const selectedCategory = this.catalogHelperService.userSelectedCategory || JSON.parse(localStorage.getItem('selectedCategory') || 'null');
    // Use the selectedCategory to fetch products
    if (selectedCategory) {
      this.categoryName = selectedCategory.categoryName;
      this.catalogDataService.getProductsByCategory(selectedCategory._id).subscribe((data: any) => {
        // Handle the fetched products
        this.products = data.products;
      });
    }


  }

  addToCart(product: any): void {
    // Implement the logic to add the product to the cart
    console.log('Adding product to cart:', product);
  }

}
