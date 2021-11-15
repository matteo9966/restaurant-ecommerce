//questo è lo store del mio app
import { useState, useEffect } from "react";
import { ENUMproductsActions } from "../interfaces/enumProductsAction";
import { BehaviorSubject } from "rxjs";
import { GlobalStore } from "../interfaces/IGlobalStore";
                                                  // let globalStore: Record<string, {}> = {}; //oggetto che conterrà tutti gli elementi del mio store
let actionList: Record<string, Function> = {};    //tutte le azioni per aggiornare il mio store
                                                  // const listeners: ((store: {}) => void)[] = []; //un array di ascoltatori che andranno ad aggiornare lo stato del mio store

const globalStore$ = new BehaviorSubject<GlobalStore>({
  products: [],
  cart: { countItems: 0, totalPrice: 0, ProductsList: [] },
});                                                 // questo è il mio behavior subject a cui potrò iscrivermi //questo valore è stato creato e resterà

export const useRxjsStore = (): [
  GlobalStore,
  (action: string | ENUMproductsActions, payload: any) => void
] => {
  const [_, setState] = useState<GlobalStore>({
    products: [],
    cart: { countItems: 0, totalPrice: 0, ProductsList: [] },
  });                                                 //questo mi serve per aggiornare il component che usa questo hook quando avviene un aggiornamento

  useEffect(() => {
                                                      //faccio un iscrizione al observer che è globalStore.
    const subscription = globalStore$.subscribe((value) => {
      setState(value);
    });                                              //invece di usare il dispatch, passero
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateGlobalStore = <T extends {}>(
    action: string | ENUMproductsActions,
    payload: T
  ) => {
                                                      //gli action mi servono sempre pero invece di fare il loop di listeners uso il globalstore$.next che aggiornerà tutti i suoi iscritti.
    const newStore = actionList[action](globalStore$.getValue(), payload);
    globalStore$.next(newStore);
  };


  return [globalStore$.getValue(), updateGlobalStore]; // quello che viene restituito è il valore che ha globalStore, il valore che h
};


//init store prende lo slice di store da aggiungere allo store sostanzialmente
export const initStore = (store: {}, actions: Record<string, Function>) => {
  globalStore$.next({ ...globalStore$.getValue(), ...store });
  actionList = { ...actionList, ...actions };
};
