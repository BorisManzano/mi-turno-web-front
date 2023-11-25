import React, { useState } from "react";
import "../ClientProfileEdition/ClientProfileEdit.scss";
import Navbar from "../../commons/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { login } from "../../state/user";
export default function ClientProfileEdit() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({
    nameAndLast_name: user.fullname,
    email: user.email,
    DNI: user.dni,
    telephone: user.telephone,
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

    if (data.newPassword !== data.newPasswordConfirm) {
      toast.error("LAS CONTRASEÑAS NO COINCIDEN", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else {
      data.password = data.newPassword;
    }
    const toPut = { email: user.email };
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] && data[key] !== user[key]) {
        toPut[key] = data[key];
      }
    }

    axios
      .put("http://localhost:3001/api/users/edit/profile", {
        ...toPut,
      })
      .then(() => {
        toast.warning("LOS CAMBIOS SE ACTUALIZARÁN EN TU PRÓXIMA SESIÓN", {
          position: toast.POSITION.TOP_CENTER,
        });
        toast.success("TU PERFIL FUE ACTUALIZADO", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.log("ERROR EN PEDIDO AXIOS", err));
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
              name="nameAndLast_name"
              defaultValue={user.fullname}
              className="input"
              type="text"
              onChange={handleChanges}
            />
            <p className="p-form-client">Mail</p>
            <input
              name="email"
              defaultValue={user.email}
              className="input"
              type="email"
              disabled
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
                  name="DNI"
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
                  name="telephone"
                  defaultValue={user.telephone}
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
