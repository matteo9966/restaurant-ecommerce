import React from 'react'
import { useHistory } from 'react-router-dom';
import { useAuthenticationRxjs } from '../../../custom-hooks/authentication-store-hook'
import { Modal } from 'bootstrap';
export const Logout:React.FC<{id:string,hide:Function}> = ({id,hide}) => {

    const history = useHistory();
   const {updateLoginStatus}= useAuthenticationRxjs()
    
   function onLogoutConfirm(){
  console.log("cliccato per nascondere!")
        updateLoginStatus("LOGOUT")
        hide()
        history.replace('/');
    }

    return (
        <div className="modal fade" id={id} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Conferma Logout</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h3>Sei sicuro di voler effettuare il logout?</h3>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={onLogoutConfirm} className="btn btn-secondary"  /* data-toggle="modal" data-target="#logoutAlert" data-dismiss="modal" */>Conferma</button>
             
            </div>
          </div>
        </div>
      </div>
    )
}
