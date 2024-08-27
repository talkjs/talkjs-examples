import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<any[]>

  constructor(private productService: ProductService) {
    this.products$ = productService.getProducts();
    console.log(this.products$);
  }

  ngOnInit(): void {
  }

}
