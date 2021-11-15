//questo è lo store del mio app
/* import { useState, useEffect } from "react";
import { ENUMproductsActions } from "../interfaces/enumProductsAction";

let globalStore: Record<string, {}> = {}; //oggetto che conterrà tutti gli elementi del mio store
let actionList: Record<string, Function> = {}; //tutte le azioni per aggiornare il mio store
const listeners: ((store: {}) => void)[] = []; //un array di ascoltatori che andranno ad aggiornare lo stato del mio store

export const useStore = (): [
  {},
  (action: string | ENUMproductsActions, payload: any) => void
] => {
  
  const [_, setState] = useState<{}>({});

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners.filter((el) => el !== setState);
    };
  }, []);

  const dispatch = <T extends {}>(
    action: string | ENUMproductsActions,
    payload: T
  ) => {
    //chiamo dispatch che prende uno specifico nome di azione e con quello lo
    const newStore = actionList[action](globalStore, payload);
    globalStore = { ...globalStore, ...newStore };

    for (const listener of listeners) {
      listener(globalStore);
    }
  };

  return [globalStore, dispatch];
};

export const initStore = (store: {}, actions: Record<string, Function>) => {
  globalStore = { ...globalStore, ...store };
  actionList = { ...actionList, ...actions };
};

 */
export{}