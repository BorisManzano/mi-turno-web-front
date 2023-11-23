import React, { useEffect, useState } from "react";
import { check, cancelIcon, editIcon } from "../../assets/icons";
import "./index.scss";
import Navbar from "../../commons/Navbar/Navbar";
import { useParams } from 'react-router-dom';
import axios from "axios"
const ReservationConfirmed = function () {

  let { id } = useParams();

  const [reservation, setReservation] = useState({})
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/appointment/${id}`);
        setReservation(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();

  },[])
  // const {email, nameAndLast_name,telephone } = reservation.createdBy
  // const {date, schedule, reservationId} = reservation 
  // const {name} = reservation.branch 

  return (
    <div className="bodyComponent">
      <Navbar role={"final-client"} />
      <div className="contentMessaje">
        <i>{check}</i>
        <h1>¡Gracias por tu reserva!</h1>
        <p className="messaje">
          En hasta 5 minutos, recibirás un correo electrónico en {reservation.createdBy ? reservation.createdBy.email : ""} con todos los detalles de tu reservación. Recordá revisar tu
          buzón de correo no deseado o promociones.
        </p>

        <button className="impresion"> ¿Quéres imprimir tu comprobante?</button>
      </div>

      <div className="contentReservation">
        <section className="contentPedido">
          <div className="itemPedido">
            <div className="subitemPedido">
          
              <h2>RESERVA</h2> <p className="numeroR"> {reservation.createdBy ? reservation.reservationId : ""}</p>
            </div>

            <p>
              Hecho el 10/10/2022 a las 11:35 hs para el {reservation.createdBy ? reservation.date : ""} a las {reservation.createdBy ? reservation.schedule : ""}
              hs
            </p>
          </div>

          <div className="itemPedidoButton">
            <button className="editReservationBtn">
              {editIcon}editar reserva
            </button>
            <button className="cancelReservationBtn">
              {" "}
              {cancelIcon} cancelar reserva
            </button>
          </div>
        </section>

        <section className="contentInfo">
          <div className="item1">
            <h2>{reservation.createdBy ? reservation.createdBy.nameAndLast_name : ""}</h2>
            <p>Email : {reservation.createdBy ? reservation.createdBy.email : ""}</p>

            <p>Telefono :{reservation.createdBy ? reservation.createdBy.telephone : ""}</p>
          </div>

          <div className="item2">
            <h2>Reserva</h2>
            <p>Sucursal :{reservation.createdBy ? reservation.branch.name : ""}</p>

            <p>Horario : {reservation.createdBy ? reservation.schedule : ""}hs</p>
          </div>

          {/* <div className="item3"></div> */}
        </section>
      </div>
    </div>
  );
};

export default ReservationConfirmed;
