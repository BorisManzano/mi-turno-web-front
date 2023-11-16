import React, { useState } from "react";
import s from "./style.module.scss";
import Navbar from "../../commons/Navbar/Navbar";

export default function CreateOperator() {
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [focus, setFocus] = useState(false);
  const [dni, setDNI] = useState("");
  const fakeData = ["sucursal 1", "Sucursal 2", "Sucursal 3"];

  const handleInputPassword = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
  };

  const handleToggleFocus = () => {
    setFocus(!focus);
  };

  const handleInputConfirmPswd = (e) => {
    const newValue = e.target.value;
    setConfirmPswd(newValue);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setDNI(newValue);
  };
  return (
    <>
      <Navbar />
      <div className={s.parent}>
        <form className={s.f}>
          <h1>Creación de Operadores</h1>
          <div className={s.inputMail}>
            <label htmlFor="name">Fullname</label>
            <input
              type="text"
              name="fullname"
              id="fn"
              placeholder="Name Lastname"
            />
          </div>
          <div className={s.inputMail}>
            <label htmlFor="email" className={s.textInputs}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="em"
              placeholder="example_name@example.com"
            />
          </div>
          <div className={s.rowForm}>
            <div>
              <label htmlFor="dni" className={s.textInputs}>
                DNI
              </label>
              <input
                type="text"
                id="dni"
                name="dni"
                maxLength="8"
                pattern="[0-9]{1,8}"
                placeholder="9999999"
                value={dni}
                onChange={handleInputChange}
                className={s.inputArea}
              />
            </div>
            <div className={s.allInputs}>
              <label htmlFor="Branch">Branch</label>
              <select
                name="Branch"
                id="Branch"
                className={s.inputArea}
                placeholder="Sucursal"
              >
                <option disabled selected>
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
                Password
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
                  placeholder="password"
                  value={password}
                  className={s.inputPassword}
                  onChange={handleInputPassword}
                  onFocus={handleToggleFocus}
                  onBlur={handleToggleFocus}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className={s.textInputs}>
                Confirm Password
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
                  placeholder="password"
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
            <h3>Sign up</h3>
          </button>
        </form>
      </div>
    </>
  );
}
