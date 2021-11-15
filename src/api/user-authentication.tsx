import React from 'react'
import { resultType } from "./data-types";
import {loginUrl,registerUrl} from './urls'
import axios from 'axios'
// type loginFunction = (email:string,password:string)=>Promise<resultType>

export const loginUser= async (data:{email:string,password:string}) => {
    //1 provo a fare il post di questi dati che dovranno andare 
    let result:resultType = {data:{},error:false}
     try{
        const axiosResult = await axios.post(loginUrl,{email:data.email,password:data.password}) 
        console.log("axiosResult: ",axiosResult)
        result.data =  axiosResult;
        
        //axios in error salva il valore 
        
     
    }catch(err:any){
        console.log("axios",err.response,"\nerr.data:",err.data)
       result.error=true;
       console.log(err);
       //qui dentro devo fare il response se va bene e mandarlo
     }

   
    return result
        

}

export const registerUser = async (data:{name:string,email:string,password:string}) =>{
    let result:resultType = {data:{},error:false};
    try {
        const axiosResult = await axios.post(registerUrl,{name:data.name,email:data.email,password:data.password});
        result.data=axiosResult;

        
    } catch (error:any) {
        console.log(error?.response)
        result.error=true;
    }
    return result
}
