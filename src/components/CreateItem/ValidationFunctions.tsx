import { isValidElement } from "react";

//queste sono funzioni di validazione che servono a validare gli input e restituiscono tutte o vero o falso
export type ValidatorFunction = (value:string)=>{isValid:Boolean,errorMessage:string}

export class ValidationStatus {
    isValid:Boolean;
    errorMessage:string
    constructor(isValid:Boolean,errorMessage:string){
       this.isValid=isValid;
       this.errorMessage=errorMessage;
    }
}

export const ValidateIngrediente:ValidatorFunction = (value:string):ValidationStatus => {
     
    
    if(value.length<2){
        return new ValidationStatus(false,"inserire un valore valido")
    }
   
    return new ValidationStatus(true,"")
}

//da rimuovere ma per ora va bene 
export const ValidateNome:ValidatorFunction = (value:string):ValidationStatus => {
     
    
    if(value.length<5){
        return new ValidationStatus(false,"inserire un Nome valido")
    }
   
    return new ValidationStatus(true,"")
}

export const ValidateDescrizione:ValidatorFunction = (value:string):ValidationStatus => {
     
    
    if(value.length<6 || value.length>100){
        return new ValidationStatus(false,"descrizione deve essere compresa tra 6 e 50 caratteri")
    }
   
    return new ValidationStatus(true,"")
}

export const ValidatePrice:ValidatorFunction = (value:string):ValidationStatus =>{
    const regex:RegExp = /^\d+\.\d{2}$/
    const result = regex.test(value);
    console.log("risultato del test: ",result)
    if(!result){
        return new ValidationStatus(false,"prezzo non valido(es 10.34 o 0.01) valore inserito: "+ value)
    }
    return new ValidationStatus(true,"")
}


export const ValidateUsername:ValidatorFunction = (value:string):ValidationStatus =>{
   if(value.length<5){
       return new ValidationStatus(false,"inserire un username di almeno 6 caratteri")
   }
   return new ValidationStatus(true,"");

}


//la validatzione della password potrebbe essere fatta con altre cose  tipo lunghezza di almeno 6 numeri e simboli ecc

export const ValidatePassword:ValidatorFunction = (value:string):ValidationStatus =>{
    if(value.length<6){
        return new ValidationStatus(false,"inserire una password di almeno 6 caratteri!!")
    }
    return new ValidationStatus(true,"");
 
 }


 export const ValidateEmail:ValidatorFunction = (value:string):ValidationStatus =>{
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const result = re.test(value);
    if(!result){
        return new ValidationStatus(false,"email inserita non valida!!")
    }
    return new ValidationStatus(true,"")
 }


export  const resetStatus= (resetter:()=>void)=>{
    resetter();
  }