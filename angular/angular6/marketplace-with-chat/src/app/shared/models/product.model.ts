import { User } from "src/app/shared/models/user.model";

export class Product {
    id: number;
    name: string;
    price: number;
    vendor: User;
    pictureUrl: string;

    constructor(id: number, name: string, price: number, pictureUrl: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.pictureUrl = pictureUrl;
    }

    setVendor(vendor: User) {
        this.vendor = vendor;
    }
}