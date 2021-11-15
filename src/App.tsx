import React from "react";

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

configureProductsStore();
configureCartStore();

function App() {
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
