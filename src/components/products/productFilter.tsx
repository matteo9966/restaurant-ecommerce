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
    function onClickSelectedElement(event:React.MouseEvent<HTMLInputElement> ){
        // const target = event.target;
        console.log((event.target as HTMLInputElement).value);
    }
  return (
    <div
      className="p-3 border d-flex"
      onClick={onClickSelectedElement}
    >
      {validTagsForFood.map((el) => { return (<div className="mx-2">
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            value={el.toString()}
          />
          <label className="btn btn-outline-primary" htmlFor="btnradio1">
            {el}
          </label>
        </div>)
      })}

 
    </div>
  );
};
