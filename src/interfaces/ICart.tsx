import { Product } from "./Iproduct";

export interface CartProduct extends Product {
    quantity:number;

}


export interface Cart{
    countItems:number;
    totalPrice:number;
    ProductsList: CartProduct[];

}