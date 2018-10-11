import { Product } from "src/app/shared/models/product.model";
import { ChatPreferences } from "src/app/shared/models/chat-preferences.model";

export class User {
    id: number;
    username: string;
    products: Product[];
    profilePictureUrl: string;
    chatPreferences: ChatPreferences;

    constructor(id: number, username: string, profilePictureUrl: string, chatPreferences: ChatPreferences) {
        this.id = id;
        this.username = username;
        this.profilePictureUrl = profilePictureUrl;
        this.chatPreferences = chatPreferences;

        this.products = [];
    }

    addProduct(product: Product) {
        this.products.push(product);
        const unReferencedUser = new User(this.id, this.username, this.profilePictureUrl, this.chatPreferences);
        
        product.setVendor(unReferencedUser);
    }
}