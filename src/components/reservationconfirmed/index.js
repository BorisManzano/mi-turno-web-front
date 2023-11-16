import React from "react";
import { check, cancelIcon, editIcon } from "../../utils/icons";
import "./index.scss";
import Navbar from "../../commons/Navbar/Navbar";

const ReservationConfirmed = function () {
  return (
    <div className="bodyComponent">
      <Navbar role={"final-client"} />
      <div className="contentMessaje">
        <i>{check}</i>
        <h1>¡Gracias por tu reserva!</h1>
        <p className="messaje">
          En hasta 5 minutos, recibirás un correo electrónico en /email de
          usuario / con todos los detalles de tu reservación. Recordá revisar tu
          buzón de correo no deseado o promociones.
        </p>

        <button className="impresion"> ¿Quéres imprimir tu comprobante?</button>
      </div>

      <div className="contentReservation">
        <section className="contentPedido">
          <div className="itemPedido">
            <div className="subitemPedido">
              {" "}
              <h2>RESERVA</h2> <p className="numeroR"> #6343854384</p>
            </div>

            <p>
              Hecho el 10/10/2022 a las 11:35 hs para el 12/10/2022 a las 13:00
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
            <h2>Rosmari Ledesma</h2>
            <p>Email : emailusuario@gmail.com</p>

            <p>Telefono : 12318274</p>
          </div>

          <div className="item2">
            <h2>Reserva</h2>
            <p>Sucursal : moreno</p>

            <p>Horario : 15:00 hs</p>
          </div>

          {/* <div className="item3"></div> */}
        </section>
      </div>
    </div>
  );
};

export default ReservationConfirmed;
