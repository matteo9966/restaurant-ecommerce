import React from "react";
import { CartProduct } from "../../interfaces/ICart";
import { useRxjsStore } from "../../store-hook/storeRxjs";
import './CartItem.css';
import { cartActionsString } from "../../store-hook/cartStoreRxjs";
export const CartItem: React.FC<{ cartProduct: CartProduct }> = (props) => {

   
  
    const dispatchAction = useRxjsStore()[1];
    
    const onClickRemoveHandler = (id:string)=>{
       dispatchAction(cartActionsString.REMOVEITEMFROMCART,id);               
    }

    const onClickAddHandler =(product:CartProduct) =>{
        dispatchAction(cartActionsString.ADDITEMTOCART,product);
    }

    const onClickRemoveItemHandler = (product:CartProduct)=>{
        dispatchAction(cartActionsString.CANCELITEM,product);
    }

  return (
    <div className="row">
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={props.cartProduct.imglink} />
        </div>
        <div className="col">
          <div className="row text-muted">{props.cartProduct.name}</div>
          <div className="row">
            {props.cartProduct.description || "no description"}
          </div>
        </div>
        <div className="col">
          {" "}
          <a href="#home" onClick={onClickRemoveHandler.bind(null,props.cartProduct._id)}>-</a>
          <a href="#home" className="border">
            {props.cartProduct.quantity}
          </a>
          <a href="#home" onClick={onClickAddHandler.bind(null,props.cartProduct)}>+</a>{" "}
        </div>
        <div className="col">
          € {props.cartProduct.price * props.cartProduct.quantity}
          <span className="close" onClick={onClickRemoveItemHandler.bind(null,props.cartProduct)}>&#10005;</span>
        </div>
      </div>
    </div>
  );
};
