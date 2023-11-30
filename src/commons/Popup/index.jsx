import React from "react";
import Success from "../../assets/Success";
import Failed from "../../assets/Failed";
import { useNavigate } from "react-router";

const Popup = ({ title, text, img, redirect }) => {
  const navigate = useNavigate();
  return (
    <div className="fake-container-popup-time fake-container-popup-time-inactive">
      <div className="popup-time-container">
        <div className="popup-time-content-container">
          {img ? <Success /> : <Failed />}
          <h1 className="h1-popup-time-text">{title}</h1>
          <p className="p-popup-time-text">{text}</p>
          <button
            className="popup-time-button"
            onClick={() =>
              typeof redirect === "string"
                ? navigate(redirect)
                : window.location.reload()
            }
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
