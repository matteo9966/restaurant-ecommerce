//ATTENZIONE: QUESTA é TUTTA ROBA FASULLA



import React,{useState,useEffect,useMemo} from 'react'
import { BehaviorSubject } from 'rxjs'

//è un hook un po diverso dagli altri store 
 const useRxjsUIStore = (initialStyle:{}) => {
    
    const updateClassNameComponent$ = useMemo(()=>{ console.log("sto eseguendo use memo"); return new BehaviorSubject<{}>(initialStyle)},[initialStyle]); // oggetto che piazzo dentro stile
   
    const setState = useState({})[1]; //quando questo cambia avviene un rerender
   
    useEffect(()=>{
       const subscription = updateClassNameComponent$.subscribe(value=>{
           setState(value)
       })
       return ()=>subscription.unsubscribe();
    },[])
 //quando creo questo hook, o quando faccio un aggiornaStore, deve chiamare lo state con il nuovo stile
  
 const dispatchNewStoreStyle = (payload:{}):void =>{  //questa funzione si occupa di aggiornare il class component
    updateClassNameComponent$.next(payload);  
 }

    return ( [updateClassNameComponent$.getValue(),dispatchNewStoreStyle] 
    )
}

export{}