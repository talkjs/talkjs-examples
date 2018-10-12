import { Product } from "src/app/shared/models/product.model";
import { USERS } from 'src/app/core/mocks/users.mock';

export const PRODUCTS: Product[] = [
    new Product(1, "Laptop", 500, 'assets/images/products/laptop.jpg'),
    new Product(2, "Bicycle", 899, 'assets/images/products/bicycle.jpg'),
    new Product(3, "Watch", 700, 'assets/images/products/watch.jpg'),
    new Product(4, "Sofa", 300, 'assets/images/products/sofa.jpg'),
    new Product(5, "Motorcycle", 7500, 'assets/images/products/motorcycle.jpg'),
    new Product(6, "Keyboard", 20, 'assets/images/products/keyboard.jpg'),
    new Product(7, "Television", 489, 'assets/images/products/television.jpg'),
    new Product(8, "Fan", 49, 'assets/images/products/fan.jpg'),
    new Product(9, "Sneakers", 120, 'assets/images/products/sneakers.jpg'),
    new Product(10, "Saucepan", 30, 'assets/images/products/saucepan.jpg'),
    new Product(11, "Plastic spoons", 5, 'assets/images/products/plastic_spoons.jpg'),
    new Product(12, "Headphones", 30, 'assets/images/products/headphones.jpg'),
    new Product(13, "Guitar amplifier",70, 'assets/images/products/guitar_amplifier.jpg')
];