import React, { useState } from "react";
import s from "./style.module.scss";
import Eye from "../../assets/Eye";
import Check from "../../assets/Check";
import Wrong from "../../assets/Wrong";
import ArrowLeft from "../../assets/ArrowLeft";
import Navbar from "../../commons/Navbar/Navbar";
import Fullname from "../../commons/Form/Fullname";
import Email from "../../commons/Form/Email";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focus, setFocus] = useState(false);
  const [dni, setDNI] = useState("");
  const [checklist, setChecklist] = useState({
    uppercaseLetter: false,
    lowercaseLetter: false,
    oneNumber: false,
    large: false,
  });

  const handleToggleFocus = () => {
    setFocus(!focus);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputConfirmPswd = (e) => {
    const newValue = e.target.value;
    setConfirmPswd(newValue);
  };

  const handleInputPassword = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setChecklist({
      uppercaseLetter: /[A-ZÑ]/.test(newValue),
      lowercaseLetter: /[a-zñ]/.test(newValue),
      oneNumber: /\d/.test(newValue),
      large: newValue.length >= 8,
    });
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setDNI(newValue);
  };

  return (
    <>
      <Navbar />
      <div className={s.divs}>
        <form className={s.f}>
          <div className={s.head}>
            <button className={s.none}>
              <ArrowLeft className={s.none} />
              Atras
            </button>
            <h1 className={s.textTittle}>Create account</h1>
          </div>
          <div className={s.inputs}>
            <div className={s.rowForm}>
              <Fullname />
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
            </div>
            <Email />
            <div className={s.rowForm}>
              <div>
                <label htmlFor="password" className={s.textInputs}>
                  Contraseña
                </label>
                <div
                  className={
                    focus && password === confirmPswd
                      ? s.focus
                      : password === ""
                      ? s.inputArea
                      : s.err
                  }
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    className={s.inputPassword}
                    onChange={handleInputPassword}
                    onFocus={handleToggleFocus}
                    onBlur={handleToggleFocus}
                  />
                  <div onClick={handleTogglePassword}>
                    <Eye />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="password" className={s.textInputs}>
                  Repetir Contraseña
                </label>
                <div
                  className={
                    focus && password === confirmPswd
                      ? s.focus
                      : password !== confirmPswd
                      ? s.err
                      : s.inputArea
                  }
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password"
                    id="pswd"
                    placeholder="Contraseña"
                    value={confirmPswd}
                    className={s.inputPassword}
                    onChange={handleInputConfirmPswd}
                    onFocus={handleToggleFocus}
                    onBlur={handleToggleFocus}
                  />
                  <div onClick={handleToggleConfirmPassword}>
                    <Eye />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.warning}>
            {password === "" ? (
              <p className={s.marg2}>La contraseña debe contener:</p>
            ) : (
              <p className={s.marg}>La contraseña debe contener:</p>
            )}

            <div className={s.bBorder}></div>
            <div className={s.container}>
              <div className={s.rowOne}>
                {password === "" ? (
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
                        <Wrong /> <p>ABC</p> <p>Una letra minúscula</p>
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
                {password === "" ? (
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
                        <Wrong /> <p>123</p> <p>Un número</p>
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
          </div>
          <button className={s.btnSingIn}>
            <h3>Registrarme</h3>
          </button>
          <div className={s.bBorder}></div>

          <button
            className={s.btnLog}
            onClick={() => navigate("/client/login")}
          >
            ¿Ya tenés cuenta? Iniciá sesión
          </button>
        </form>
      </div>
    </>
  );
}
