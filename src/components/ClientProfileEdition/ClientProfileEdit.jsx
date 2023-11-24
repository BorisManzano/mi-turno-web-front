import React, { useState } from "react";
import "../ClientProfileEdition/ClientProfileEdit.scss";
import Navbar from "../../commons/Navbar/Navbar";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function ClientProfileEdit() {
  const user = useSelector((state) => state.user);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({
    fullname: user.fullname,
    email: user.email,
    dni: user.dni,
    phoneNumber: user.phoneNumber,
    password: user.password,
    newPassword: user.newPassword,
    newPasswordConfirm: user.newPasswordConfirm,
  });

  function handleChanges(e) {
    e.preventDefault();
    const { name } = e.target;

    setData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
  }
  function handleEditPasswordClick(e) {
    e.preventDefault();
    setDisabled(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("DATAA", data, data.newPassword);
    data.newPassword === data.newPasswordConfirm
      ? axios
          .put("http://localhost:3001/api/users/edit/profile", {
            fullname: data.fullname,
            email: data.email,
            dni: data.dni,
            phoneNumber: data.phoneNumber,
            password: data.newPassword,
          })
          .then((res) => {
            const editedUser = {
              fullname: res.data.fullname,
              email: res.email,
              dni: res.dni,
              phoneNumber: res.phoneNumber,
              password: res.password,
            };
            toast.success("TU PERFIL FUE ACTUALIZADO", {
              position: toast.POSITION.TOP_CENTER,
            });
          })
          .catch((err) => console.log("ERROR EN PEDIDO AXIOS", err))
      : toast.error("LAS CONTRASEÑAS NO COINCIDEN", {
          position: toast.POSITION.TOP_CENTER,
        });
  }

  return (
    <>
      <Navbar role={"final-client"} />
      <div className="client-page">
        <div className="client-container">
          <div className="client-form">
            <h1 className="h1-form-client">Mis datos</h1>
            <p className="p-form-client">Nombre</p>
            <input
              name="name"
              defaultValue={user.fullname}
              className="input"
              type="text"
              onChange={handleChanges}
            />
            <p className="p-form-client">Mail</p>
            <input
              name="mail"
              defaultValue={user.email}
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
                  defaultValue={user.dni}
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
                  defaultValue={user.phoneNumber}
                  className="input"
                  type="text"
                  onChange={handleChanges}
                />
              </div>
            </div>

            {disabled ? (
              <>
                <p className="p-form-client">Contraseña</p>
                <input
                  disabled={disabled}
                  name="password"
                  defaultValue={user.password}
                  className="input"
                  type="text"
                  onChange={handleChanges}
                />
              </>
            ) : (
              <>
                <p className="p-form-client">Nueva Contraseña</p>
                <input
                  disabled={disabled}
                  name="newPassword"
                  defaultValue={user.newPassword}
                  className="input"
                  type="text"
                  onChange={handleChanges}
                />
                <p className="p-form-client">
                  Escribí de nuevo tu nueva contraseña
                </p>
                <input
                  name="newPasswordConfirm"
                  defaultValue={user.newPasswordConfirm}
                  className="input"
                  type="text"
                  onChange={handleChanges}
                />
              </>
            )}
            <h4 className="h4-form-edit" onClick={handleEditPasswordClick}>
              Editar Contraseña
            </h4>
            <button className="login-button" onClick={handleSubmit}>
              Aceptar
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
