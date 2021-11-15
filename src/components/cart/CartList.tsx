//posso riciclare cartList sia per il sidebar che per la pagina del cart
import React from 'react'
import { useRxjsStore } from '../../store-hook/storeRxjs'
import { CartItem } from './CartItem';
export const CartList = () => {
    const cartstore = useRxjsStore()[0].cart;
    return (
        <div className="col h-30">
          
          {cartstore.ProductsList.map(prod=>{return <CartItem key={prod._id} cartProduct={prod}></CartItem>})}
            
        </div>
    )
}
