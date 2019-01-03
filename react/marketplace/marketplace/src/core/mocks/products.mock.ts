import { Product } from 'src/shared/models/product.model';

export const PRODUCTS: Product[] = [
    new Product(1, "Laptop", 500, process.env.PUBLIC_URL + '/assets/images/products/laptop.jpg'),
    new Product(2, "Bicycle", 899, process.env.PUBLIC_URL + '/assets/images/products/bicycle.jpg'),
    new Product(3, "Watch", 700, process.env.PUBLIC_URL + '/assets/images/products/watch.jpg'),
    new Product(4, "Sofa", 300, process.env.PUBLIC_URL + '/assets/images/products/sofa.jpg'),
    new Product(5, "Motorcycle", 7500, process.env.PUBLIC_URL + '/assets/images/products/motorcycle.jpg'),
    new Product(6, "Keyboard", 20, process.env.PUBLIC_URL + '/assets/images/products/keyboard.jpg'),
    new Product(7, "Television", 489, process.env.PUBLIC_URL + '/assets/images/products/television.jpg'),
    new Product(8, "Fan", 49, process.env.PUBLIC_URL + '/assets/images/products/fan.jpg'),
    new Product(9, "Sneakers", 120, process.env.PUBLIC_URL + '/assets/images/products/sneakers.jpg'),
    new Product(10, "Saucepan", 30, process.env.PUBLIC_URL + '/assets/images/products/saucepan.jpg'),
    new Product(11, "Plastic spoons", 5, process.env.PUBLIC_URL + '/assets/images/products/plastic_spoons.jpg'),
    new Product(12, "Headphones", 30, process.env.PUBLIC_URL + '/assets/images/products/headphones.jpg'),
    new Product(13, "Guitar amplifier",70, process.env.PUBLIC_URL + '/assets/images/products/guitar_amplifier.jpg')
];