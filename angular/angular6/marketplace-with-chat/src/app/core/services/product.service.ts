import { Injectable } from "@angular/core";

import { PRODUCTS as MOCK_PRODUCTS } from '../mocks/products.mock';
import { USERS as MOCK_USERS } from '../mocks/users.mock';
import { Product } from "src/app/shared/models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    
    constructor() {
        this.initializeProductMocks();
    }

    private initializeProductMocks() {
        [0, 1, 2, 3, 4].forEach(i => MOCK_USERS[0].addProduct(MOCK_PRODUCTS[i]));

        let productIndex = 5;
        
        for (let i = 1; i < MOCK_PRODUCTS.length; i++) {
            const vendor = MOCK_USERS[i];
            const product = MOCK_PRODUCTS[productIndex];
                
            if (vendor && product) {
                vendor.addProduct(product);
                productIndex++;
            }
        }
    }

    getProduct(productId: number) : Promise<Product> {
        return new Promise((resolve) => {
            resolve(MOCK_PRODUCTS.find(p => p.id == productId));
        });
    }

    getProducts() : Promise<Product[]> {
        return new Promise((resolve) => {
            resolve(MOCK_PRODUCTS);       
        });
    }

    getTopProducts() : Promise<Product[]> {
        return new Promise((resolve) => {
            resolve([MOCK_PRODUCTS[2], MOCK_PRODUCTS[10], MOCK_PRODUCTS[11]]);
        });
    }

    private shouldInitializeProductForFirstUser(index: number) {
        const possibleValues = [0, 1, 2, 3, 4];

        return !possibleValues.find(i => i == index);
    }
}