import React, { useState } from "react";
import Eye from "../../assets/Eye";
import axios from "axios";
import s from "../Register/style.module.scss";
import Check from "../../assets/Check";
import Wrong from "../../assets/Wrong";

const RecoverPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState();
  const [invalidInformation, setInvalidInformation] = useState("");
  const [checklist, setChecklist] = useState({
    uppercaseLetter: false,
    lowercaseLetter: false,
    oneNumber: false,
    large: false,
    validation: false,
  });
  const handleInputPassword = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setChecklist({
      uppercaseLetter: /[A-ZÑ]/.test(newValue),
      lowercaseLetter: /[a-zñ]/.test(newValue),
      oneNumber: /\d/.test(newValue),
      large: newValue.length >= 8,
    });
    if (
      checklist.large &&
      checklist.lowercaseLetter &&
      checklist.oneNumber &&
      checklist.uppercaseLetter
    ) {
      setChecklist({ validation: true });
    }
  };
  const [password, setPassword] = useState("");
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  const handleSubmit = () => {
    if (newPasswordConfirmation !== newPassword) {
      return setInvalidInformation("Las contraseñas no coinciden");
    } else setInvalidInformation("");
    axios
      .put(
        "http://localhost:3001/api/users/recoverPassword",
        { newPassword },
        { withCredentials: true }
      )
      .then(() => {})
      .catch(() => {});
  };
  return (
    <div className="recover-password-container">
      <div className="recover-password-content-container">
        <div className="recover-password-content">
          <h1 className="h1-recover-password">Recuperar contraseña</h1>
          <p className="p-recover-password">Nueva contraseña</p>
          <div className="input-container">
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              onKeyUp={(e) => setNewPassword(e.target.value)}
              onChange={handleInputPassword}
            />
            <div className="eye-container" onClick={handleTogglePassword}>
              <Eye />
            </div>
          </div>
          <p className="p-recover-password">Repetir contraseña</p>
          <div className="input-container">
            <input
              className="input"
              type={showPasswordConfirm ? "text" : "password"}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
            />
            <div
              className="eye-container"
              onClick={handleTogglePasswordConfirm}
            >
              <Eye />
            </div>
          </div>
          <div className={`${s.warning} verification-container-div`}>
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
              <p className="h4-validation-error-recover">
                {invalidInformation}
              </p>
            </div>
          </div>
          <button
            className="login-button recover-button"
            onClick={handleSubmit}
          >
            Cambiar contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
