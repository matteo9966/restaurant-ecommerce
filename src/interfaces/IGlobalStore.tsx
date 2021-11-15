import { Cart } from "./ICart";
import { Product } from "./Iproduct";

export interface GlobalStore{
   products: Product[];
   cart:Cart;
}
