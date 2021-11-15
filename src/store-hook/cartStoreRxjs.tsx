import { Cart } from "../interfaces/ICart";
import { CartProduct } from "../interfaces/ICart";
import { Product } from "../interfaces/Iproduct";
import { initStore } from "./storeRxjs";
import { GlobalStore } from "../interfaces/IGlobalStore";
export enum cartActionsString {
  ADDITEMTOCART = "ADDITEMTOCART",
  REMOVEITEMFROMCART = "REMOVEITEMFROMCART",
  CANCELITEM="CANCELITEM"
}


function updateCart(newCart:GlobalStore) {
  const reducer = (sum:number,element:CartProduct)=>{
        return sum + element.price*element.quantity
  }
  const finalprice = newCart.cart.ProductsList.reduce(reducer,0)
  newCart.cart.totalPrice= finalprice
  
}




//i metodi dentro action si occupano solo di restituire un nuovo valore per il globalStore.
export const configureCartStore = () => {
  const actions = {
    [cartActionsString.ADDITEMTOCART]: (
      store: GlobalStore,
      payload: Product
    ): GlobalStore => {
      const newCart = { ...store.cart };
      //1 cerco in newCart se è presente product del payload
      //2 se presente faccio quantity+1
      //3 non è presente faccio push new CartProduct con quantità = 1

      const productId = payload._id;
      const index = newCart.ProductsList.map((el) => el._id).findIndex(
        (id) => id === productId
      );
      if (index >= 0) {
        newCart.ProductsList[index].quantity++;
      } else {
        newCart.ProductsList.push({ ...payload, quantity: 1 });
      }
      

      newCart.totalPrice = newCart.totalPrice + payload.price;
      const newStore = { ...store, cart: newCart };
      updateCart(newStore);
      return newStore; 
    },

    [cartActionsString.REMOVEITEMFROMCART]:(store:GlobalStore,id:string):GlobalStore=>{
      const newStore = {...store};
      const item = newStore.cart.ProductsList.find(el=>el._id===id);
      if(item){
        if(item.quantity>1){
          item.quantity=item.quantity-1;
        }else{
           const index = newStore.cart.ProductsList.indexOf(item);
           if (index > -1) {
            newStore.cart.ProductsList.splice(index, 1);
          }
         
        }

        updateCart(newStore);

      }
      return newStore
    },
    [cartActionsString.CANCELITEM]:(store:GlobalStore,product:CartProduct):GlobalStore|void =>{
      const newStore = {...store};
      const index = newStore.cart.ProductsList.indexOf(product);
      if (index > -1) {
        newStore.cart.ProductsList.splice(index, 1);
        updateCart(newStore);
        return newStore
      }
      else return
    }
    

  };
  const initialCart: { cart: Cart } = {
    cart: { countItems: 0, totalPrice: 0, ProductsList: [] },
  };
  initStore(initialCart, actions);
};
