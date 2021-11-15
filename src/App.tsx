import React,{useEffect} from "react";
import { useFetch } from "./custom-hooks/http-fetch";
 import { getAllProducts } from "./api/products-fetch";
import "./App.css";
import { useRxjsStore } from "./store-hook/storeRxjs";
import { configureProductsStore } from "./store-hook/productsStoreRxjs";
import { configureCartStore } from "./store-hook/cartStoreRxjs";
import { ProductsListPage } from "./pages/ProductsListPage";
import { CreateProductPage } from "./pages/CreateProductPage";
import { AuthenticationPage } from "./pages/AuthenticationPage";
import { Navbar } from "./components/UI/navabar/navbar";
import { Footer } from "./components/UI/footer/footer";
import { SidebarCart } from "./components/cart/SidebarCart";
import { Switch, Route, Redirect } from "react-router-dom";
import { CheckoutPage } from "./pages/CheckoutPage";

//questo è solo per vedere se funziona :

// import {getAllProducts} from './api/products-fetch';

// getAllProducts();

// configureProductsStore();
configureCartStore();

function App() {
  const {state:AllProductsState,sendRequest} = useFetch(getAllProducts)
    
  //creo e chiamo una funzione asincrona qui dentro!

  useEffect(()=>{  
    console.log("configuro tutti i prodotti!!")

    // async function getProductsFromDB() {
    //   await sendRequest();


    // }
    sendRequest()
    // configureProductsStore();
  },[])

   useEffect(()=>{
     console.log("lo stato dei prodotti:",AllProductsState);
     if(AllProductsState.status==="success"){
       if(AllProductsState.data?.data?.products){
       
          //  let prodList = [].concat(AllProductsState.data.data.products) 
         
           configureProductsStore(AllProductsState.data.data.products) // product

       }
       else{
         configureProductsStore([]);
       }
     }
   },[AllProductsState])



  useEffect(()=>{configureCartStore()},[])



  const globalStore = useRxjsStore()[0];
  console.log(globalStore);
  return (
    <div className="App">
      <SidebarCart />

      <div className="container d-flex">
        <h3 className="display-3">Ristorante</h3>
      </div>

      <Navbar></Navbar>

      <Switch>
        <Route path="/" exact>
          <Redirect to="/menu"></Redirect>
        </Route>
        <Route path="/authentication" exact>
          <AuthenticationPage></AuthenticationPage>
        </Route>

        <Route path="/menu" exact>
          <ProductsListPage></ProductsListPage>
        </Route>

        <Route path="/checkout" exact>
          <CheckoutPage></CheckoutPage>
        </Route>
        <Route path="/create">
          <CreateProductPage></CreateProductPage>
        </Route>
      </Switch>

      <Footer></Footer>
    </div>
  );
}

export default App;
