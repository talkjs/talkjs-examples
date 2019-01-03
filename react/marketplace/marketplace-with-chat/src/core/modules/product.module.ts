import { Product } from 'src/shared/models/product.model';

import { PRODUCTS as MOCK_PRODUCTS } from 'src/core/mocks/products.mock';
import { USERS as MOCK_USERS } from 'src/core/mocks/users.mock';

export function initializeProductMocks() {
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

export function getProduct(productId: number) : Promise<Product> {
    return new Promise((resolve) => {
        resolve(MOCK_PRODUCTS.find(p => p.id == productId));
    });
}

export function getProducts() : Promise<Product[]> {
    return new Promise((resolve) => {
        resolve(MOCK_PRODUCTS);       
    });
}

export function getTopProducts() : Promise<Product[]> {
    return new Promise((resolve) => {
        resolve([MOCK_PRODUCTS[2], MOCK_PRODUCTS[10], MOCK_PRODUCTS[11]]);
    });
}