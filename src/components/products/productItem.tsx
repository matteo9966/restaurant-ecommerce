import React from "react";
import { Product } from "../../interfaces/Iproduct";
import { useRxjsStore } from "../../store-hook/storeRxjs";
import { cartActionsString } from "../../store-hook/cartStoreRxjs";
export const ProductItem: React.FC<{ product: Product }> = (props) => {
  const updateStore = useRxjsStore()[1];

  const onAddClickHandler = () => {
    updateStore(cartActionsString.ADDITEMTOCART, props.product); //questo è come un dispatch con un action e un payload
  };

  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="card-header">{props.product.name}</div>
        {/* <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: صورة مصغرة"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c" />
          <text x="50%" y="50%" fill="#eceeef" dy=".3em">
            صورة مصغرة
          </text>
        </svg> */}
        <div className="container p-0 mh-15">
          <img
            src={props.product.imglink}
            className="img-thumbnail"
            alt={`img of ${props.product.name}`}
            style={{maxHeight:"30vh"}}
          />
        </div>

        <div className="card-body">
          <p className="card-text">
            {props.product.description || "nessuna descrizione disponibile"}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                onClick={onAddClickHandler}
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Aggiungi
              </button>
            </div>
            <small className="text-muted">{`€ ${props.product.price}`}</small>
          </div>
        </div>
      </div>
    </div>
  );
};
