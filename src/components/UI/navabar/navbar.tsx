import React,{useState,useEffect,useMemo} from "react";
import ReactDOM from "react-dom";
import { Link ,useHistory } from "react-router-dom";
import * as bootstrap from 'bootstrap'

import { LoginStatus } from "../../../interfaces/ILoginStatus";
import { useAuthenticationRxjs} from '../../../custom-hooks/authentication-store-hook'
import { Logout } from "../logout-alert/Logout";
// var myModal = new bootstrap.Modal(document.getElementById('logoutAlert')!)
export const Navbar = () => {

   
  const history = useHistory();
  // const [modalVisible,setModalVisible] = useState(false)
  const [logoutAlert,setLogoutAlert] = useState<bootstrap.Modal>();
  useEffect(()=>setLogoutAlert(new bootstrap.Modal(document.getElementById('logoutAlert')!)),[])


  
  const {loginStatus/* ,updateLoginStatus */} =useAuthenticationRxjs();
  // const logout = ()=>{updateLoginStatus("LOGOUT"); history.replace('/')} // questo è come redux che ha una funzione di dispatch

   function showModal(){
    // var myModal1 = new bootstrap.Modal(document.getElementById('logoutAlert')!)
    //  myModal1.show();
    // setModalVisible(st=>!st);
    logoutAlert?.show()
   }
   
   function hideModal(){

    
    logoutAlert?.hide()

   }
  
   



  return (
    <nav className=" navbar sticky-top navbar-expand-lg navbar-light bg-light p-3">
    {ReactDOM.createPortal(  <Logout id="logoutAlert" hide={hideModal}></Logout>,document.getElementById("logout")!)}
      <a className="navbar-brand" href="#home">
        Home
      </a>
      {loginStatus.isLoggedIn? <button type="button" className="btn btn-success" disabled>Sei Loggato</button> :
       <button type="button" className="btn btn-danger" disabled>FAI IL LOGIN</button>}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <span className="navbar-text  ms-auto me-4">
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link className="nav-link active" to="/create">
                Nuovo Prodotto
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/authentication">
                Autenticazione
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link "
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                Carrello
              </a>
            </li>
         {loginStatus.isLoggedIn && <li><button onClick={showModal} /* data-toggle="modal" */ type="button" className="btn btn-dark" /* data-target="#logoutAlert" */>Logout</button></li> }
        
          </ul>
        </span>
      </div>
    </nav>
  );
};
