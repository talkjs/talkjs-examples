import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from 'src/app/products/components/product-list/product-list.component';
import { routing } from 'src/app/products/products.routing';
import { ProductPageComponent } from 'src/app/products/components/product-page/product-page.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ProductListComponent, ProductPageComponent]
})
export class ProductsModule { }
