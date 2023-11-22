import React from "react";
import { useNavigate, useParams } from "react-router";

const PopupReservation = ({ state }) => {
  const navigate = useNavigate();
  const params = useParams();
  // cambia el h1 con el mensaje
  const action = params.reservationNumber ? "modificado" : "reservado";
  return (
    <div className="fake-container-popup fake-container-popup-inactive">
      {state ? (
        <div className="popup-container">
          <div className="popup-content-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 3.5H18C19.3807 3.5 20.5 4.61929 20.5 6V18C20.5 19.3807 19.3807 20.5 18 20.5H6C4.61929 20.5 3.5 19.3807 3.5 18V6C3.5 4.61929 4.61929 3.5 6 3.5ZM2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM16.1719 9L11.25 13.9219L8.57812 11.25C8.28041 10.9523 7.79772 10.9523 7.5 11.25C7.20228 11.5477 7.20228 12.0304 7.5 12.3281L10.7109 15.5391C11.0125 15.8275 11.4875 15.8275 11.7891 15.5391L17.25 10.0781C17.5477 9.78041 17.5477 9.29772 17.25 9C16.9523 8.70228 16.4696 8.70228 16.1719 9Z"
                fill="green"
              />
            </svg>
            <h1 className="h1-popup-text">Turno {action} con exito</h1>
            <p className="p-popup-text">
              Gracias por confiar en nuestro servicio
            </p>
            <button
              className="popup-button"
              onClick={() => navigate("/client/reservationConfirmed")}
            >
              Continuar
            </button>
          </div>
        </div>
      ) : (
        <div className="popup-container">
          <div className="popup-content-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 3.5H18C19.3807 3.5 20.5 4.61929 20.5 6V18C20.5 19.3807 19.3807 20.5 18 20.5H6C4.61929 20.5 3.5 19.3807 3.5 18V6C3.5 4.61929 4.61929 3.5 6 3.5ZM2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM8.625 9.70312L10.9219 12L8.625 14.2969C8.32728 14.5946 8.32728 15.0773 8.625 15.375C8.92272 15.6727 9.40541 15.6727 9.70312 15.375L12 13.0781L14.2969 15.375C14.5946 15.6727 15.0773 15.6727 15.375 15.375C15.6727 15.0773 15.6727 14.5946 15.375 14.2969L13.0781 12L15.375 9.70312C15.6727 9.40541 15.6727 8.92272 15.375 8.625C15.0773 8.32728 14.5946 8.32728 14.2969 8.625L12 10.9219L9.70312 8.625C9.40541 8.32728 8.92272 8.32728 8.625 8.625C8.32728 8.92272 8.32728 9.40541 8.625 9.70312Z"
                fill="red"
              />
            </svg>
            <h1 className="h1-popup-text">No se pudo realizar el cambio</h1>
            <p className="p-popup-text">
              Este turno ya fue ocupado, vuelve a intentarlo más tarde o
              modificando algún parámetro
            </p>
            <button className="popup-button">Volver a intentar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupReservation;
