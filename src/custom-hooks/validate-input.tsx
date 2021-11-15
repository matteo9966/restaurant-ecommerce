import React,{useState} from 'react'
import { ValidatorFunction,ValidationStatus } from '../components/CreateItem/ValidationFunctions'


//questo hook prende una funzione di validazione Per creare l'hook,
//questa funzione di validazione deve restituire un ValidationStatus
//questo hook restituisce uno stato isValidState e un checkValidation


type validatorHook = (validator:ValidatorFunction)=>[ValidationStatus,(val:string)=>ValidationStatus,()=>void]

export const useValidate:validatorHook = (validatore:ValidatorFunction) => {
    const[ isValidState,setIsValid] = useState<ValidationStatus>(new ValidationStatus(true,""))
    
    function checkValidation(value:string){
        const statoValido = validatore(value);
        setIsValid(statoValido)
        return statoValido;

    }
    function resetValidationState() {
        setIsValid(new ValidationStatus(true,""))
    }
    

    return ([isValidState,checkValidation,resetValidationState])
}
