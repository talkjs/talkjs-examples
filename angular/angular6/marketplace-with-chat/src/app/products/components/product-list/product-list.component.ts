import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() { 
    this.productService.getProducts().then(products => {
      this.products = products;
    });
  }

  goToProductPage(product: Product) {
    this.router.navigate(['products/' + product.id]);
  }

}
