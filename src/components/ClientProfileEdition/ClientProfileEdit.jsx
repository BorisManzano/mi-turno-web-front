import React, { useState } from "react";
import "../ClientProfileEdition/ClientProfileEdit.scss";

export default function ClientProfileEdit() {
  const [data, setData] = useState({
    name: "",
    mail: "",
    dni: "",
    phoneNumber: "",
    password: "",
  });

  function handleChanges(e) {
    e.preventDefault();
    const { name } = e.target;

    setData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
  }
  return (
    <div className="client-page">
      <div className="client-container">
        <div className="client-form">
          <h1 className="h1-form-client">Mis datos</h1>
          <p className="p-form-client">Nombre</p>
          <input
            name="name"
            value={data.name}
            className="input"
            type="text"
            onChange={handleChanges}
          />
          <p className="p-form-client">Mail</p>
          <input
            name="mail"
            value={data.mail}
            className="input"
            type="mail"
            onChange={handleChanges}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                flex: 1,
                marginRight: "10px",
              }}
            >
              <p className="p-form-client">DNI</p>

              <input
                style={{ width: "100%" }}
                name="dni"
                value={data.dni}
                className="input"
                type="text"
                onChange={handleChanges}
              />
            </div>
            <div style={{ flex: 1, marginLeft: "10px" }}>
              <p className="p-form-client">Telefono</p>
              <input
                style={{ width: "98.5%" }}
                name="phoneNumber"
                value={data.phoneNumber}
                className="input"
                type="text"
                onChange={handleChanges}
              />
            </div>
          </div>
          <p className="p-form-client">Contraseña</p>
          <input
            name="password"
            value={data.password}
            className="input"
            type="text"
            onChange={handleChanges}
          />
          <h4 className="h4-form-edit">Editar Contraseña</h4>
          <button className="login-button">Aceptar</button>
        </div>
      </div>
    </div>
  );
}
