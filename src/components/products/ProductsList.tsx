import React from "react";
import { ProductItem } from "./productItem";
import { useRxjsStore } from "../../store-hook/storeRxjs"
import { GlobalStore } from "../../interfaces/IGlobalStore";

export const ProductsList = () => {
   const store = useRxjsStore()[0] as GlobalStore; //sono sicuro che mi restituisce uno store 

  return (
    <div className="container my-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
         {store.products.map((product,index)=>{return <ProductItem key={index} product={product}></ProductItem>})}
      </div>
    </div>
  );
};
