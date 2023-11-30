import React from "react";
import Success from "../../assets/Success";
import Failed from "../../assets/Failed";
import { useNavigate } from "react-router";

const Popup = ({ popupInfo }) => {
  const navigate = useNavigate();
  return (
    <div className="fake-container-popup fake-container-popup-inactive">
      <div className="popup-container">
        <div className="popup-content-container">
          {popupInfo.img ? <Success /> : <Failed />}
          <h1 className="h1-popup-text">{popupInfo.title}</h1>
          <p className="p-popup-text">{popupInfo.text}</p>
          <button
            className="popup-button"
            onClick={() =>
              typeof popupInfo.redirect === "string"
                ? navigate(popupInfo.redirect)
                : window.location.reload()
            }
          >
            {popupInfo.bottonText || `Continuar`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
