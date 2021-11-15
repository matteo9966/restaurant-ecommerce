import React, { FormEvent } from "react";
import { useState, useRef, useEffect } from "react";
import { Product } from "../../interfaces/Iproduct";
import { uploadProductImage,createAProduct } from "../../api/products-fetch";
import { useFetch } from "../../custom-hooks/http-fetch";
import { useValidate } from "../../custom-hooks/validate-input";
import { ValidateIngrediente,ValidateNome,ValidateDescrizione, ValidatePrice } from "../../components/CreateItem/ValidationFunctions";
import { Tags } from "./Tags";
type FileEventTarget = Event & { target: { files: FileList } };

export const CreateItem = () => {
  const { state, sendRequest } = useFetch(uploadProductImage); //questo è lo stato per il caricamento dell'immagine sul cloud
  
  const {state:createProductState,sendRequest:sendRequestToCreateProduct} = useFetch(createAProduct)
  

  const [isValidIngredient, validateIngredient] =
    useValidate(ValidateIngrediente);
  
  const [isValidName,validateName] = useValidate(ValidateNome);
  
   const [isValidDescrizione,validateDescrizione]= useValidate(ValidateDescrizione);

   const [isValidPrice,validatePrezzo] = useValidate(ValidatePrice);

  console.log("lo stato durante il fetch è: ", state);

  const nameRef = useRef<HTMLInputElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);
  const prezzoRef = useRef<HTMLInputElement>(null);
  const descrizioneRef = useRef<HTMLTextAreaElement>(null);
  const fileinputRef = useRef<HTMLInputElement>(null);

  const updateTagsList = (tags: String[], value: string) => {
    if (tags.includes(value)) {
      return (oldTags: String[]) => {
        const index = oldTags.indexOf(value);
        const newTags = [...oldTags];

        newTags.splice(index, 1);
        return newTags;
      };
    }
    return (oldTags: String[]) => {
      const newTags = [...oldTags];
      newTags.push(value);
      return newTags;
    };
  };
  const [tags, setListaTags] = useState<String[]>([]);

  const [listaIngredienti, setListaIngredienti] = useState<string[]>([]); //ho estratto l'array dallo stato per semplificare il ragionamento. anche se potrei usare usereducer a questo punto
  const [infoProdotto, setInfoProdotto] = useState<Product>({
    id: 0,
    price: 0,
    name: "",
    description: "",
    imglink: "",
    _id:''
  });

  useEffect(() => {
    if (state.status === "success") {
      setInfoProdotto((old) => {
        return { ...old, imglink: state.data.data.data.secure_url };
      });


    }
  }, [state]);

  useEffect(()=>{
    if(createProductState.status==="success"){
      console.log("prodotto inviato correttamente al database!:\n",createProductState);
      //se creo il productState posso uscire dalla pagina o qualcosa del genere
      
    }
  },[createProductState]) //quando cambia lo state vuol dire che ho ricevuto qualcosa

  useEffect(()=>{console.log("Il valore di info prodotto:",infoProdotto)},[infoProdotto])


  const onCheckedItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListaTags(updateTagsList(tags, e.target.value));

    if (e.target.checked) {
      //mettere nell'array di set info prodotto i tag selezionati, controllare prima se è presente, se non è presente mettilo dentro
      console.log(e.target.value);
    } else {
      console.log("ho fatto l'uncheck di questo elemento:", e.target.value);
    }
  };

  const onChangeInputFileList = (event: FileEventTarget) => {
    const file = event.target.files[0]; //se qualcosa non va è qua!
    if (file) {
      if (file.type.startsWith("image")) {
        // uploadProductImage(file);
        sendRequest(file);

        //invece di usare quel metodo uso un hook per vederer che sto in attesa dell'esecuzione
      } else {
        //errore, qualcosa non va!
      }
    } else {
      //mettere in rosso il form per dire che c'e qualcosa che non va
      ///##TODO
      return;
    }
  };

  const onClickPerCaricareSulDB = (e:FormEvent) =>{
    e.preventDefault();
    //tutto pronto posso mandare il prodotto al db! 
    // Considera una validazione prima di mandare?
    sendRequestToCreateProduct(infoProdotto)




  }

  const onClickPerCrearePreviewProdotto = (e: FormEvent) => {
    e.preventDefault();
    const price = prezzoRef.current?.value || "";
    const name = nameRef.current?.value || "";
    const descrizione = descrizioneRef.current?.value || "";
    const fileinput = fileinputRef.current?.value || "";
 //questo lo posso aggiornare dopo che ho validato tutti!
 //1 VALIDA NOME, SE IL NOME NON é VALIDO MOSTRA UN ERRORE!
 //2 VALIDA DESCRIZIONE SE LA DESCRIZIONE NON é VALIDA MOSTRA UN ERRORE
 //3 SE IL PREZZO NON è VALIDO MOSTRA UN ERORRE
 //4 SE TUTTI I CAMPI INSERITI INCLUSO FILE E TAGS SONO VALIDI FAI IL SUBMIT!

 //1 Validazione nome:
 // è tutto salvato nello state InfoProdotto
const isValidPrice= validatePrezzo(price.toString()).isValid
const nameIsValid= validateName(name).isValid; 
const descriptionIsvalid = validateDescrizione(descrizione).isValid
console.log("descrizione ",descriptionIsvalid)

if(nameIsValid && descriptionIsvalid && isValidPrice){
  
  console.log("ntutto valido posso aggiornare lo stato di info prodotto e renderlo pronto per essere caricato!!")
  
  setInfoProdotto((oldInfo)=>{
    return {...oldInfo,price:Number(price),description:descrizione,name:name,tags:tags,ingredients:listaIngredienti}
  })

 


}   
   
        

  };
  //valida ingrediente1
  const addIngredient = () => {
    if (ingredientRef.current!.value) {
      const valore_inserito= ingredientRef.current!.value;
      const isValidStatus = validateIngredient(ingredientRef.current!.value);
      console.log("ingrediente inserito:",ingredientRef.current!.value);
      if (isValidStatus.isValid) {
        setListaIngredienti((listavecchia) => {
          return [...listavecchia, valore_inserito];
        });
        ingredientRef.current!.value="";
      }
    }
  };

  function aggiornaStatoCaricamento() {
    let stato = <p></p>;

    if (state.status === "pending") {
      let messaggio= "Caricamento in corso...";
      stato = <p>{messaggio}</p>
      
    }
    if (state.status === "error") {
      stato = <p>{"errore nel caricamento dell'immagine"}</p>
    }
    if (state.status === "success") {
     stato = <img style={{maxHeight:"20rem"}} src={infoProdotto.imglink} alt="immagine non disponibile" />
    }

    return stato;
  }

  const stato = aggiornaStatoCaricamento();

  return (
    <form className="vh-100">
      <div className="container">
        <div className="row mt-5">
          <div className="col-7 pe-3 border-end">
            <h3 className="my-3">Aggiungi Prodotto</h3>
            <br />
            <div className="my-3">
              <input
                
                ref={nameRef}
                placeholder="Nome prodotto..."
                type="text"
                className={`form-control ${
                  !isValidName.isValid && "bg-danger"
                } `}
                id="nome-prodotto"
              />
              {!isValidName.isValid && <p className="text-danger">{isValidName.errorMessage}</p>}
            </div>
            <div  className=" my-5 ">
              <div className="input-group">
                <input
                  ref={ingredientRef}
                  type="text"
                  className={`form-control ${
                    !isValidIngredient.isValid && "bg-danger"
                  } `}
                  placeholder="Aggiungi ingrediente..."
                />
                <button
                  onClick={addIngredient}
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Aggiungi
                </button>
              </div>
              {!isValidIngredient.isValid && (
                <div className="mt-1">
                  <p className="text-danger">{isValidIngredient.errorMessage}</p>
                </div>
              )}
            </div>
            <div className="my-4">
            <div className="form-floating ">
              <textarea
                ref={descrizioneRef}
                className={`form-control  ${
                  !isValidDescrizione.isValid && "bg-danger"
                } `}
                placeholder="Aggiungi una descrizione del prodotto"
                id="floatingTextarea2"
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="floatingTextarea2">Descrizione</label>

            </div>
            {!isValidDescrizione.isValid && (
                <div className="mt-1">
                  <p className="text-danger">{isValidDescrizione.errorMessage}</p>
                </div>
              )}

            </div>
            <div className="my-1">
              <h5>Scegli dei tag:</h5>
              <Tags onSelectedItem={onCheckedItem} />
            </div>
            <div className="my-5">
            <div className="input-group">
              <span className="input-group-text">€</span>
              <input
                ref={prezzoRef}
                placeholder="Prezzo..."
                id="prezzo-prodotto"
                type="text"
                className={`form-control  ${
                  !isValidPrice.isValid && "bg-danger"
                } `}
                aria-label="Prezzo"
              />
            </div>
            {!isValidPrice.isValid && (
                <div className="mt-1">
                  <p className="text-danger">{isValidPrice.errorMessage}</p>
                </div>
              )}

            </div>
            <div className="my-4">
              <label htmlFor="formFile" className="form-label">
                Scegli una immagine per il prodotto
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={onChangeInputFileList as any}
                ref={fileinputRef}
              />
            </div>
            <div className="d-flex flex-row-reverse my-4">
              <button
                onClick={onClickPerCrearePreviewProdotto}
                className="btn btn-primary"
              >
                Crea Prodotto
              </button>
            </div>
          </div>
          <div className="col-5">
            <h3 className="my-3">Dettagli prodotto</h3>
            <br />
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{infoProdotto.name}</h5>
                <p className="card-text">{infoProdotto.description}</p>
              </div>
              <h5>Lista ingredienti:</h5>
              <div className="card-body">
                <ul
                  className="list-group list-group-flush"
                  style={{
                    
                    overflowY: "scroll",
                    maxHeight: "12rem",
                  }}
                >
                  {listaIngredienti.map((el, index) => {
                    return (
                      <li key={index} className="list-group-item">
                        {el}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="card-body">
                <h5>Immagine selezionata</h5>
                <div className="border m-2">
                   {/* invece di avere qui uno stato, metto qui un immagine */}
                  {/*carico qui lo spinner mentre viene effettuato l'upload  */}
                  {stato}
                </div>
              </div>
              <div className="card-body">
                <div className="container">
                  <div className="row">
                    <h6>Tags selezionati:</h6>
                    <p>{infoProdotto.tags?.join()}</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h5>Prezzo</h5>
                <div className="border m-2">
                  <p>{infoProdotto.price}</p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row-reverse my-4">
              <button className="btn btn-primary" onClick={onClickPerCaricareSulDB}>Carica Sul Database</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
