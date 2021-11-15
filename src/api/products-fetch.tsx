import axios from "axios";
import { Product } from "../interfaces/Iproduct";
import { resultType } from "./data-types";
import { uploadImageUrl,createProductUrl } from "./urls";

// const url='http://localhost:3001/api/v1/dummy'





// export const getAllProducts = async () => {
//      const response = await fetch(url);
//      const data = response.body;
//      console.log("messaggio dal server",data);

//     // return (
//     //     <div>

//     //     </div>
//     // )
// }

//a questo file passo un payload che è l'immagine

//queste funzioni devono restituire tutte un oggetto

//il risultato di ogni metodo deve essere un oggetto con data ed error.

export const uploadProductImage = async (file: File): Promise<resultType> => {
  let result = { data: {}, error: false };

  const formData = new FormData();

  formData.append("immagine", file); // invece di usare fetch uso axios!!
  try {
    const risposta = await axios.post(uploadImageUrl , formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const message = risposta;

    result.data = risposta;

    console.log(result);
  } catch (error) {
    result.error = true;

    console.log(error);
  }

  return result;
};

export const createAProduct = async (product: Product): Promise<resultType> => {
  let result = { data: {}, error: false };
  try {
    const risposta = await axios.post(createProductUrl, product);
    const message = risposta;

    result.data = risposta;

    console.log(result);
  } catch (err) {
    result.error = true;
  }

  return result;
};



/* //funzionano entrambi ma userò axios perchè è piu facile e gestisce gli errori!
//>>>QUESTO NON cè biso
export const uploadProductImageConFetch = async (file: File) => {
  const formData = new FormData();
  formData.append("immagine", file); // invece di usare fetch uso axios!!
  //   console.log(file);
  const response = await fetch(URL, {
    // headers: {

    //     'Content-Type': 'multipart/form-data'
    //   },
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log(data);
  // try {
  //     const risposta = await axios.post(URL,formData,{
  //         headers:{
  //             'Content-Type':'multipart/form-data'
  //         }
  //     })
  //     // imageValue = src
  //     const message = risposta
  //     console.log(message);
  //    } catch (error) {
  //     //  imageValue = null
  //     console.log(error);
  //    }
};
 */
