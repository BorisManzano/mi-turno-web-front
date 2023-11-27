import React, { useState } from "react";
import s from "./style.module.scss";
import Navbar from "../../commons/Navbar/Navbar";
import Fullname from "../../commons/Form/Fullname";
import axios from "axios";

export default function CreateOperator() {
  const [data, setData] = useState({
    nameAndLast_name: "",
    DNI: "",
    email: "",
    password: "",
    branch: "",
    isOperator: true,
  });
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [focus, setFocus] = useState(false);
  const fakeData = ["sucursal 1", "Sucursal 2", "Sucursal 3"];

  const handleInputPassword = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setData({ ...data, password: newValue });
  };

  const handleToggleFocus = () => {
    setFocus(!focus);
  };

  const handleInputConfirmPswd = (e) => {
    const newValue = e.target.value;
    setConfirmPswd(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "DNI") {
      const nums = value.replace(/[^0-9]/g, "");
      setData({
        ...data,
        [name]: parseInt(nums),
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/users/register", data)
      .then(() => {
        alert("Registro exitoso");
        setData({
          nameAndLast_name: "",
          DNI: "",
          email: "",
          password: "",
          branch: "",
          isOperator: true,
        });
        setPassword("");
        setConfirmPswd("");
      })
      .catch((err) => {
        console.error("Error en el registro:", err);
        alert("Error en el registro:", err);
      });
  };

  return (
    <>
      <div className={s.parent}>
        <form onSubmit={handleSubmit} className={s.f}>
          <h1>Creación de Operadores</h1>
          <div className={s.inputMail}>
            <Fullname
              value={data.nameAndLast_name}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className={s.inputMail}>
            <label htmlFor="email" className={s.textInputs}>
              Mail
            </label>
            <input
              type="email"
              name="email"
              id="em"
              value={data.email}
              autoComplete="username"
              placeholder="ejemplo_nombre@ejemplo.com"
              onChange={handleInputChange}
            />
          </div>
          <div className={s.rowForm}>
            <div>
              <label htmlFor="dni" className={s.textInputs}>
                DNI
              </label>
              <input
                type="text"
                id="DNI"
                name="DNI"
                maxLength="8"
                pattern="[0-9]{1,8}"
                placeholder="9999999"
                value={data.DNI}
                onChange={handleInputChange}
                className={s.inputArea}
              />
            </div>
            <div className={s.allInputs}>
              <label htmlFor="Branch">Sucursal</label>
              <select
                name="branch"
                id="Branch"
                className={s.inputArea}
                value={data.branch}
                onChange={handleInputChange}
              >
                <option disabled value="" selected>
                  seleccione una sucursal
                </option>
                {fakeData.map((suc) => {
                  return <option value={suc}>{suc}</option>;
                })}
              </select>
            </div>
          </div>
          <div className={s.rowForm}>
            <div>
              <label htmlFor="password" className={s.textInputs}>
                Contraseña
              </label>
              <div
                className={
                  focus
                    ? password === confirmPswd
                      ? s.focus
                      : s.err
                    : s.inputArea
                }
              >
                <input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="contraseña"
                  value={data.password}
                  className={s.inputPassword}
                  onChange={handleInputPassword}
                  onFocus={handleToggleFocus}
                  onBlur={handleToggleFocus}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className={s.textInputs}>
                Repetir Contraseña
              </label>
              <div
                className={
                  focus
                    ? password === confirmPswd
                      ? s.focus
                      : s.err
                    : s.inputArea
                }
              >
                <input
                  type="text"
                  name="cpassword"
                  id="cpassword"
                  placeholder="contraseña"
                  value={confirmPswd}
                  className={s.inputPassword}
                  onChange={handleInputConfirmPswd}
                  onFocus={handleToggleFocus}
                  onBlur={handleToggleFocus}
                />
              </div>
            </div>
          </div>
          <button type="submit" className={s.btnSingIn}>
            <h3>Registrar</h3>
          </button>
        </form>
      </div>
    </>
  );
}
