import React,{useState,useEffect} from "react";
import { ProductItem } from "./productItem";
import { useRxjsStore } from "../../store-hook/storeRxjs"
import { GlobalStore } from "../../interfaces/IGlobalStore";
import { ProductFilter } from "./productFilter";
// import {Product}
export const ProductsList = () => {
  const store = useRxjsStore()[0] as GlobalStore; //sono sicuro che mi restituisce uno store 
  const [productsToDisplay,setProductsToDisplay]=useState(store.products)




  return (
    <div className="container my-5">
      
      <ProductFilter/>

      {/* qui ci metto un menu a tendina che filtra tutto */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
         {store.products.map((product,index)=>{return <ProductItem key={index} product={product}></ProductItem>})}
      </div>
    </div>
  );
};
