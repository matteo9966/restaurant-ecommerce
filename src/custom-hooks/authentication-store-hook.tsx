import React, { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { LoginStatus } from "../interfaces/ILoginStatus";
/* 
Quando vado a fare il login, devo salvare nel session storage i dati che ho ricevuto. in questo modo se l'utente fa il reload non deve fare di nuovo il login ma si 
trova nella pagina giusta 
*/

//qui posso mettere le funzioni che verificano se il loginStatus è presente
function calculateInitialSubjectValue(): LoginStatus {
  let initialValue = {
    isLoggedIn: false,
    token: "",
    expiresin: Number.MAX_SAFE_INTEGER,
    isAdmin: false,
  };
  let sessionStatus = sessionStorage.getItem("loginStatus");
  if (sessionStatus == null) {
    return initialValue;
  } else {
    let candidateInitialValue = JSON.parse(sessionStatus);
    if (candidateInitialValue.expiresin < 3600) {
      return initialValue;
    } else {
      initialValue = candidateInitialValue;
      return initialValue;
    }
  }

  //vedi se nel session storage sono salvati i valori:
  //1)isadmin
  //2)il token
  //3)quandoScade
  //4)se ho questi tre faccio il login altrimenti butto via tutto e facccio is LoggedIn è falso.
}

const authenticationSubject$ = new BehaviorSubject<LoginStatus>(
  calculateInitialSubjectValue()
);

//per adesso non salvo il token in una sessione ma nello stato

const calculateRemainingTimeForToken = (expiring: Number) => {
  const currentTime = new Date().getTime();
  const exptime = new Date(+expiring * 1000).getTime();
  return exptime - currentTime;
};

//gli actions devono restituirmi un nuovo stato
const authenticationActions: Record<string, Function> = {
  LOGIN: (payload: LoginStatus) => {
    //salvo nel session storage il loginStatus.

    sessionStorage.setItem("loginStatus", JSON.stringify(payload));

    console.log("effettuo il login");
    //salvo il token nello subject

    //  const newStatus:LoginStatus = {isLoggedIn:true,token:pa}

    return payload;
  },

  LOGOUT: () => {
    sessionStorage.removeItem("loginStatus");
    console.log("effettuo il logout");
    return {
      isLoggedIn: false,
      token: "",
      expiresin: Number.MAX_SAFE_INTEGER,
      isAdmin: false,
    };
  },
};

export const useAuthenticationRxjs = () => {
  const [authState, setAuthState] = useState<LoginStatus>(
    authenticationSubject$.getValue()
  );

  useEffect(() => {
    const subscription = authenticationSubject$.subscribe((val) =>
      setAuthState(val)
    );
    return () => subscription.unsubscribe();
  }, []);

  const updateLoginStatus = (action: string, payload?: LoginStatus) => {
    const newLoginStatus = authenticationActions[action](
      payload
    ) as LoginStatus;

    if (newLoginStatus.isLoggedIn) {
      const timetoExp = calculateRemainingTimeForToken(
        newLoginStatus.expiresin
      );

      console.log("il token scade tra:", timetoExp, "millisecondi");
      if (timetoExp <= 0) {
        console.log("è il tempo di fare il logout :(");
      }
    }
    //da qui dentro posso chiamare una funzione che fa il logout
    console.log(
      "sto aggiornando il loginStatus con il nuovo login status:\n\n",
      newLoginStatus
    );
    authenticationSubject$.next(newLoginStatus); // questo causerà un rerender
  };

  return { loginStatus: authenticationSubject$.getValue(), updateLoginStatus };
};

//quello che manca ora è la logica per i login il logout e il set del token
