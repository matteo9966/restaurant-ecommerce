import React from "react";
import { CartList } from "./CartList";
import { useRxjsStore } from "../../store-hook/storeRxjs";

export const Checkout = () => {
  const globalstore = useRxjsStore()[0];
  
  const numeroArticoli = globalstore.cart.ProductsList.length;
  const totale=globalstore.cart.totalPrice;

  return (
    <div className="container vh-100 mt-5 ">
      <div className="row">
        <div className="col-md-8">
          <h3 className="border-bottom">Carrello</h3>
          <CartList></CartList>
        </div>
        <div className="col-md-4">
        <h3 className="border-bottom">Dettagli</h3>
          <div className="container border-bottom">
            <div className="row">
              <div className="col-8">
              <p>Totale:</p>

              </div>
              <div className="col-4">
               {totale}{"€"}
              </div>
            </div>
            <div className="row">
            <div className="col-8">
              <p>Quantità:</p>

              </div>
              <div className="col-4">
               {numeroArticoli}
              </div>
            </div>
          </div>
          <form className=" d-flex flex-column justify-content-between">
            <div className="my-3">
            <p>Modalità di spedizione:</p>
              <select
                className="form-select"
                aria-label="Default select example"
                id="shipping-method"
              >
                <option defaultValue="Nessuna spedizione">Scegli modalità di spedizione...</option>
                <option value="Prime">Prime</option>
                <option value="Magic">Magic</option>
                <option value="Super">Super</option>
              </select>
             
            </div>
            <div className="my-3">
             <p>Coupon sconto:</p>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          
            <button type="submit" className="btn btn-primary mt-5">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
