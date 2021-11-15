import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthenticationRxjs } from "../../custom-hooks/authentication-store-hook";
import { LoginStatus } from "../../interfaces/ILoginStatus";
import { useFetch } from "../../custom-hooks/http-fetch";
import { loginUser, registerUser } from "../../api/user-authentication";
import {
  ValidateUsername,
  ValidatePassword,
  ValidateEmail,
  resetStatus,
} from "../CreateItem/ValidationFunctions";
import { useValidate } from "../../custom-hooks/validate-input";
//la prima cosa che voglio verificare è che quando faccio login lo stato diventi isLogged in = true

export const AuthenticationForm = () => {
  const history = useHistory();
   
 const {updateLoginStatus}= useAuthenticationRxjs();

  const [
    validationUsernameStatus,
    checkUserNameValidation,
    resetUsernameStatus,
  ] = useValidate(ValidateUsername);
  const [
    validationPasswordStatus,
    checkPasswordValidation,
    resetPasswordStatus,
  ] = useValidate(ValidatePassword);
  const [validationEmailStatus, checkEmailValidation, resetEmailStatus] =
    useValidate(ValidateEmail);
  const [isLogin, setIsLogin] = useState(true);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { state: loginState, sendRequest: sendLoginRequest } =
    useFetch(loginUser); //questo hook per fare login
  const { state: registerstate, sendRequest: sendRegisterRequest } =
    useFetch(registerUser);
  
  const showLoginSpinner=loginState.status==="pending" || registerstate.status==="pending"

  useEffect(() => {
    console.log(loginState); //salva il token da qualche parte
    
    if(loginState.status==="success"){

      const token = loginState.data.data.data.token;
      const user_data = loginState.data.data.data.user_data; //? questo non so che farci
      const expires_in = loginState.data.data.data.expires_in;
      
      //ora posso fare il dispatch con un payload e un action
  
      const loginStatusToDispatch:LoginStatus={isLoggedIn:true,token:token,expiresin:expires_in,isAdmin:user_data.isAdmin};
      updateLoginStatus("LOGIN",loginStatusToDispatch);
      history.replace('/');
      
      //ora posso fare il dispatch!
      
    }

    
  }, [loginState]);

  useEffect(() => {
    console.log(registerstate);
    if (registerstate.status === "success") {
      console.log("ti sei registrato con successo!!!");
      console.log(registerstate.data.data.data.token);
      console.log(registerstate.data.data.data.user_data); //salva il token da qualche parte


    }
  }, [registerstate]);


  // const {loginStatus,updateLoginStatus} = useAuthenticationRxjs();

  // useEffect(()=>{console.log("il login status in authentication form:",loginStatus)},[loginStatus]) //quando il loginStatusCambia perchè ho effettuato il login posso reindirizzare la pagina perchè ho effettuato il login!

  const changeFormStyle = () => {
    setIsLogin((state) => !state);
    resetPasswordStatus();
    resetUsernameStatus();
    resetEmailStatus();
  };

  const submitForm = () => {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const email = emailRef.current?.value || "";

    const isValidusername = checkUserNameValidation(username).isValid;
    const isValidPassword = checkPasswordValidation(password).isValid;
    const isValidEmail = checkEmailValidation(email).isValid;
    if (!isLogin) {
      if (isValidusername && isValidPassword && isValidEmail) {
        sendRegisterRequest({
          name: username,
          password: password,
          email: email,
        });
      }
    } else {
      if (isValidPassword && isValidEmail) {
        sendLoginRequest({ email: email, password: password });
      }
    }

    // const newLogin:LoginStatus = {isLoggedIn:true,token:"token-fasullo-che-vale-per-fare-il-login"}
    // updateLoginStatus("LOGIN",newLogin);
  };
  //a questa funzione passo

  return (
    <div className="container" style={{ position: "relative" }}>
  {  showLoginSpinner && <div
        className="loading"
        style={{  width: "100%", height: "100%" ,backgroundColor:"rgba(208,228,245,0.65)" }}
      > 
        <p className="m-3"><b>Caricamento in corso...</b></p>
        <div className="spinner-border" role="status" >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
      <div className="container w-50 vh-100">
        <form>
          <h3 className="p-3 mt-2">{isLogin ? "Login" : "Registrazione"}</h3>
          <div className="container">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                ref={emailRef}
                onClick={resetStatus.bind(null, resetEmailStatus)}
                type="email"
                placeholder="Inserisci email..."
                className="form-control"
                id="exl1"
                aria-describedby="emailHelp"
              />
              {!validationEmailStatus.isValid && (
                <p className="text-danger">
                  {validationEmailStatus.errorMessage}
                </p>
              )}
            </div>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input
                  ref={usernameRef}
                  onClick={resetStatus.bind(null, resetUsernameStatus)}
                  type="text"
                  placeholder="Inserisci username..."
                  className="form-control"
                  id="eEmail1"
                  aria-describedby="emailHelp"
                />

                {!validationUsernameStatus.isValid && (
                  <p className="text-danger">
                    {validationUsernameStatus.errorMessage}
                  </p>
                )}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                onClick={resetStatus.bind(null, resetPasswordStatus)}
                placeholder="Inserisci password..."
                className="form-control"
                id="Password1"
              />
              {!validationPasswordStatus.isValid && (
                <p className="text-danger">
                  {validationPasswordStatus.errorMessage}
                </p>
              )}
            </div>

            <button
              onClick={submitForm}
              type="button"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <div className="container mt-3">
            <p
              onClick={changeFormStyle}
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
            >
              {!isLogin ? "Login" : "Registrati!"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
