//tags ['primo','secondo','contorno','dolce','pesce','carne','pizza','vegan','glutenfree'];
// export enum tags{
//   PRIMO="primo",
//   SECONDO="secondo",
//   CONTORNO="contorno",
//   PESCE="pesce",
//   CARNE="carne",
//   PIZZA="pizza",
//   VEGAN="vegan",
//   GLUTENFREE="gluten free"
  
// }
export interface Product {
    id:number;
    price:number;
    name:string;
    description?:string;
    imglink?:string;
    ingredients?:string[];
    tags?:String[]
}