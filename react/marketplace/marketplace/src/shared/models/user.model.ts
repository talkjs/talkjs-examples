import { Product } from 'src/shared/models/product.model';

export class User {
    id: number;
    username: string;
    products: Product[];
    profilePictureUrl: string;

    constructor(id: number, username: string, profilePictureUrl: string) {
        this.id = id;
        this.username = username;
        this.profilePictureUrl = profilePictureUrl;

        this.products = [];
    }

    addProduct(product: Product) {
        this.products.push(product);
        const unReferencedUser = new User(this.id, this.username, this.profilePictureUrl);
        
        product.setVendor(unReferencedUser);
    }
}