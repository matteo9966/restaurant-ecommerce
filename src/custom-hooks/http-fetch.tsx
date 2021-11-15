import React,{useReducer,useCallback} from 'react'
import { Product } from '../interfaces/Iproduct'
import{ resultType} from '../api/data-types'
//tipi accettati
// type RequestData =Product | null
// type FetchFunction<T> = (requestData:T) =>void

export enum actionTypes {
    PENDING="pending",
    SUCCESS="success",
    ERROR="error",
   
}

type stateType ={
    status:actionTypes | null,
    data:any
}

export type requestFunctionType = (data:any)=>Promise<resultType>

const reducerFunction = (state:stateType,action:{type:actionTypes,payload:any}):stateType=>{
  if(action.type===actionTypes.PENDING){
      return {
          status:actionTypes.PENDING,
          data:null
      }
  }
  if(action.type===actionTypes.SUCCESS){
      return {
          status:actionTypes.SUCCESS,
          data:action.payload
      }
  }
  if(action.type===actionTypes.ERROR){
      return {
          status:actionTypes.ERROR,
          data:null
      }
  } 

  return state  //altrimenti restituisci lo stato precedente 
  

}

//request function deve restituire un payload


export const useFetch = (requestFunction:requestFunctionType):{state:stateType,sendRequest:Function} => {
    const [state,dispatch]=useReducer(reducerFunction,{status:null,data:null}) // quando viene creato inizia come null
     

     
     const sendRequest =useCallback( async (data:any) =>{
            dispatch({type:actionTypes.PENDING,payload:null}); 
        try{
            const response = await requestFunction(data); //devo definire come deve essere questa requestFunction 
            if(response.error){
                throw new Error("errore durante la richiesta!")
            }

            dispatch({type:actionTypes.SUCCESS,payload:response});

        }catch(err){
            dispatch({type:actionTypes.ERROR,payload:null})
        }

     },[requestFunction] )
      
    return {state,sendRequest}
}
