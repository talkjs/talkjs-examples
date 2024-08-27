import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getProducts(){
    let products = this.db.list('/products').valueChanges();
    console.log(products);
    return products;
  }
}
