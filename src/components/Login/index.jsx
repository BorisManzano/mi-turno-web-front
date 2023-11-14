import React, { useState } from "react";

const Login = () => {
  const [userInputValue, setUserInputValue] = useState();
  const [passwordInputValue, setPasswordInputValue] = useState();
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h1 className="h1-form-login">Iniciar sesion</h1>
          <p className="p-form-login">Usuario</p>
          <input
            className="input"
            type="text"
            onChange={(e) => setUserInputValue(e.target.value)}
          />
          <p className="p-form-login">Contraseña</p>
          <input
            className="input"
            type="password"
            onChange={(e) => setPasswordInputValue(e.target.value)}
          />
          <h4 className="h4-form-login">¿Olvidaste tu contraseña?</h4>
          <button className="login-button">Ingresar</button>
          <div className="login-form-line"></div>
          <button className="go-to-register-button">
            ¿No tenés cuenta? Registrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
