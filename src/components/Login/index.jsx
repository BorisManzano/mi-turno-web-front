import React, { useState } from "react";
import Navbar from "../../commons/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userInputValue, setUserInputValue] = useState();
  const [passwordInputValue, setPasswordInputValue] = useState();
  const handleSubmit = (e) => {
    // axios
    //   .post(
    //     "http://localhost:3001/api/users/login",
    //     {
    //       email: userInputValue,
    //       password: passwordInputValue,
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    navigate("/client/newReservation");
    // })
    // .catch((err) => console.error(err));
  };
  return (
    <div>
      <Navbar role={"final-client"} />
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
            <button className="login-button" onClick={() => handleSubmit()}>
              Ingresar
            </button>
            <div className="login-form-line"></div>
            <button
              className="go-to-register-button"
              onClick={() => navigate("/client/register")}
            >
              ¿No tenés cuenta? Registrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
