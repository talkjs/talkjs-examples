import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { 
    this.productService.getProduct(this.getProductId()).then(product => {
      this.product = product;
    });
  }

  goToVendorPage(vendor: User) {
    this.router.navigate(['users/' + vendor.id]);
  }

  private getProductId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

}
