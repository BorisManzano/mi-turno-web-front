import React, { useEffect, useState } from "react";
import "./index.scss";
import { useParams } from 'react-router-dom';
import axios from "axios"
const ConfirmationOfRegistration = function () {
  
  const [confirmed, setConfirmed] = useState(false)
  const {token} = useParams()
  useEffect(()=>{
      axios.put(`http://localhost:3001/api/nodeMailer/confirmation/${token}`)
      .then(response => {
        console.log(response);
        setConfirmed(true)
      })
      .catch(error => {
        console.error(error);
        // alert("token invalido o expirado")
        setConfirmed("TOKEN INVALIDO O EXPIRADO!")
      });
  },[])

  return (
    <div className="bodyComponent">
      <h1>
        { confirmed  === true ? "registro confirmado ": confirmed } 
      </h1>
    </div>
  );
};

export default ConfirmationOfRegistration;
