// import bootstrap from "bootstrap";
// import bootstrap from "bootstrap";
import React,{useState,useEffect} from "react";
import { useRxjsStore } from "../../store-hook/storeRxjs";
import { CartList } from "./CartList";
import { useHistory } from "react-router-dom";
import { Offcanvas } from "bootstrap";
// declare let bootstrap:any;
export const SidebarCart = () => {

  //  const [sidebar,setSidebar]  = useState<Offcanvas>()
   
   const [sidebarvisible,setSidebarvisible] = useState(false);

  const history = useHistory();


    
    const onClickCheckout= ()=>{
      history.replace("/checkout")
      setSidebarvisible(s=>!s);

  }


  const cartStore = useRxjsStore()[0].cart;

  return (
    <div
      
      className="offcanvas offcanvas-end overflow-hidden"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
      data-bs-backdrop="false"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Carrello
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <h3>
          Totale:{" "}
          <span className="badge bg-secondary">{cartStore.totalPrice}</span>
        </h3>
        <div className="container vh-70">
          <div className="col d-flex flex-column">
            <div
              className="row border"
              style={{ height: "80vh", overflow: "scroll" }}
            >
              <CartList></CartList>
            </div>
            <div className="row">
            
              <button  className="btn btn-primary" data-bs-dismiss="offcanvas" onClick={onClickCheckout}>
                Checkout con History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
