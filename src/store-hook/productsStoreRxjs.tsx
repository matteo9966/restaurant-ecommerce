import { initStore } from "./storeRxjs";
import { Product } from "../interfaces/Iproduct";

// const DUMMYPRODUCTS:Product[] = [
//   {name:"Pizza Margherita",id:0,price:5,description:"pizza lievitata 72 ore",ingredients:["pomodoro","mozzarella"],imglink:"http://www.nicolasalvatore.com/web/wp-content/uploads/2017/05/Pizza_Margherita_accademia_Barilla_1.jpg"},
//   {name:"Pizza Diavola",id:1,price:6.5,description:"pizza lievitata 72 ore molto piccante",ingredients:["pomodoro","mozzarella","salametto"],imglink:"https://www.silviocicchi.com/pizzachef/wp-content/uploads/2015/03/d2.jpg"},
//   {name:"Pizza Capricciosa",id:2,price:7.5,description:"pizza lievitata 72 ore",ingredients:["pomodoro","mozzarella","carciofi"],imglink:"https://primochef.it/wp-content/uploads/2018/05/SH_pizza_capricciosa.jpg"},
//   {name:"Tagliata vitello",id:3,price:15,description:"Scottona allevata al pascolo ",ingredients:["scottona fresca","sale","pepe"],imglink:"https://static.cookist.it/wp-content/uploads/sites/21/2018/09/tagliata-di-manzo-segreti.jpg"},
//   {name:"BBQ ribs",id:4,price:25,description:"Costine affumicate con salsa bbq prestigiosa",ingredients:["costine di maiale","costine"],imglink:"https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/09/Spare-ribs-1111.jpg"},
//   {name:"Salmone fresco",id:5,price:25,description:"Salmone pescato nel mar baltico",ingredients:["salmone","sale"],imglink:"https://www.pescheriavarpescaolbia.it/wp-content/uploads/unnamed.jpg"},
//   {name:"Totano fritto",id:6,price:25,description:"Totano fritto in olio di oliva",ingredients:["Totano","olio","sale"],imglink:"https://www.manjoo.it/wp-content/uploads/1513196841_540_img.jpg"},
//   {name:"Polpo",id:7,price:25,description:"Polpo grosso e fresco",ingredients:["Polpo","Sale"],imglink:"https://www.oggi.it/cucina/wp-content/uploads/sites/19/2008/07/polpo_griglia-645-470x377.jpg"},

  

// ]


//invece di ricevere l'array di prodotti faccio il fetch di prodotti....

export const configureProductsStore = (product_items:Product[]) => {
  const products: { products: Product[] } = {
    products:product_items,
  };


  const actions = {
    ADDPRODUCT: (globalstore: {}, product: Product): {} => {
      let newStore = { ...globalstore, product };
      return newStore;
    },
  };

  initStore(products, actions);
};

