import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Check from "../../assets/Check";
import Eye from "../../assets/Eye";
import Wrong from "../../assets/Wrong";
import "../ClientProfileEdition/ClientProfileEdit.scss";
import s from "../Register/style.module.scss";
export default function ClientProfileEdit() {
  const userRedux = useSelector((state) => state.user);
  const email = userRedux.email;
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");

  const [showPassword, setShowassword] = useState(false);
  const [checklist, setChecklist] = useState({
    uppercaseLetter: false,
    lowercaseLetter: false,
    oneNumber: false,
    large: false,
    validation: false,
  });
  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:3001/api/users/edit/profile/${email}`)
        .then((res) => {
          setUser({
            fullname: res.data.fullname,
            email: res.data.email,
            DNI: res.data.DNI,
            userId: res.data.id,
            telephone: res.data.telephone,
            password: "*******",
            newPassword: res.data.newPassword,
            newPasswordConfirm: res.data.newPasswordConfirm,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [email]);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({
    fullname: user.fullname,
    email: user.email,
    DNI: user.DNI,
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

  const handleTogglePassword = () => {
    setShowassword(!showPassword);
  };
  const handleInputPassword = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setData({ ...data, newPassword: newValue });
    setChecklist({
      uppercaseLetter: /[A-ZÑ]/.test(newValue),
      lowercaseLetter: /[a-zñ]/.test(newValue),
      oneNumber: /\d/.test(newValue),
      large: newValue.length >= 8,
      validation:
        /[A-ZÑ]/.test(newValue) &&
        /[a-zñ]/.test(newValue) &&
        /\d/.test(newValue) &&
        newValue.length >= 8,
    });
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (!checklist.validation) {
      toast.error("PASSWORD ERROR", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (data.newPassword !== data.newPasswordConfirm) {
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
        toast.success("TU PERFIL FUE ACTUALIZADO", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.log("ERROR EN PEDIDO AXIOS", err));
  }

  return (
    <>
      <div className="client-page">
        <div className="client-container">
          <div className="client-form">
            <h1 className="h1-form-client">Mis datos</h1>
            <p className="p-form-client">Nombre</p>
            <input
              name="fullname"
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
                  defaultValue={user.DNI}
                  className="input"
                  type="text"
                  maxLength="8"
                  pattern="[0-9]{7,8}"
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
                <p className="p-form-client">
                  Nueva Contraseña
                  <div className={s.row1} onClick={handleTogglePassword}>
                    <Eye />
                  </div>
                </p>
                <input
                  disabled={disabled}
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  // defaultValue={user.newPassword}
                  value={data.newPassword}
                  className="input"
                  onChange={handleInputPassword}
                />

                <div className={s.container}>
                  <div className={s.rowOne}>
                    {data.newPassword === "" ? (
                      <>
                        <div className={s.row3}>
                          <p>ABC</p> <p>Una letra mayúscula</p>
                        </div>
                        <div className={s.row3}>
                          <p>abc</p> <p>Una letra minúscula</p>
                        </div>
                      </>
                    ) : (
                      <>
                        {checklist.uppercaseLetter ? (
                          <div className={s.row1}>
                            <Check /> <p>ABC</p> <p>Una letra mayúscula</p>
                          </div>
                        ) : (
                          <div className={s.row2}>
                            <Wrong /> <p>ABC</p> <p>Una letra mayúscula</p>
                          </div>
                        )}
                        {checklist.lowercaseLetter ? (
                          <div className={s.row1}>
                            <Check /> <p>abc</p> <p>Una letra minúscula</p>
                          </div>
                        ) : (
                          <div className={s.row2}>
                            <Wrong /> <p>abc</p> <p>Una letra minúscula</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className={s.rowOne}>
                    {data.password === "" ? (
                      <>
                        <div className={s.row3}>
                          <p>123</p> <p>Un número</p>
                        </div>
                        <div className={s.row3}>
                          <p>***</p> <p>Mínimo 8 caracteres</p>
                        </div>
                      </>
                    ) : (
                      <>
                        {checklist.oneNumber ? (
                          <div className={s.row1}>
                            <Check /> <p>123</p> <p>Un número</p>
                          </div>
                        ) : (
                          <div className={s.row2}>
                            <Wrong /> <p>123</p> <p>Un número</p>
                          </div>
                        )}
                        {checklist.large ? (
                          <div className={s.row1}>
                            <Check /> <p>***</p> <p>Mínimo 8 caracteres</p>
                          </div>
                        ) : (
                          <div className={s.row2}>
                            <Wrong /> <p>***</p> <p>Mínimo 8 caracteres</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <p className="p-form-client">
                  Escribí de nuevo tu nueva contraseña
                </p>
                <input
                  name="newPasswordConfirm"
                  defaultValue={user.newPasswordConfirm}
                  className="input"
                  type={showPassword ? "text" : "password"}
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
