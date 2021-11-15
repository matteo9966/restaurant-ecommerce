import { ChangeEvent } from "react";

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
export const Tags:React.FC<{onSelectedItem:(e:React.ChangeEvent<HTMLInputElement>)=>void}> = (props) => {
  return (
    <div className="container my-4" >
        <div className="row">

      {validTagsForFood.map((tag,index) => {
        return (
            <div key={index} className="col-3 form-check text-start">
              
            <input
              className="form-check-input"
              type="checkbox"
              value={tag}
              id="flexCheckDefault"
              onChange={props.onSelectedItem}
            />
            <label className="form-check-label " htmlFor="flexCheckDefault">
              {tag}
            </label>
          </div>
        );
      })}
        </div>
    </div>
  );
};
