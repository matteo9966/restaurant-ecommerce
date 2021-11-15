import React, { Fragment } from "react";
const validTagsForFood = [
  "primo",
  "secondo",
  "contorno",
  "dolce",
  "pesce",
  "carne",
  "pizza",
  "vegan",
  "glutenfree",
];
export const ProductFilter = () => {
  return (
    <div
    /*  className="btn-group"
      role="group" */
    >
      {validTagsForFood.map((el) => {
        <div>
          <input
            type="radio"
            className="btn-check m-2"
            name="btnradio"
            id="btnradio1"
            value={el.toString()}
          />
          <label className="btn btn-outline-primary" htmlFor="btnradio1">
            {el}
          </label>
        </div>;
      })}

 
    </div>
  );
};
