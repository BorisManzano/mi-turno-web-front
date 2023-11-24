import React, { useEffect, useState } from "react";
import Navbar from "../../commons/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [userInputValue, setUserInputValue] = useState();
  const [passwordInputValue, setPasswordInputValue] = useState();
  const [invalidInformation, setInvalidInformation] = useState();
  const handleSubmit = (e) => {
    axios
      .post(
        "http://localhost:3001/api/users/login",
        {
          email: userInputValue,
          password: passwordInputValue,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        handlePath();
        console.log(response);
      })
      .catch((err) => {
        setInvalidInformation("¡Email o contraseña incorrectos!");
        console.error(err);
      });
  };

  const handlePath = () => {
    if (user.isAdmin) {
      navigate("/admin/allBranches");
    } else if (user.isOperator) {
      navigate("/operator/reservationsList");
    } else if (!user.isAdmin && !user.isOperator && user.email) {
      navigate("/client/newReservation");
    } else {
      navigate("/");
    }
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
              autoComplete="username"
            />
            <p className="p-form-login">Contraseña</p>
            <input
              className="input"
              type="password"
              onChange={(e) => setPasswordInputValue(e.target.value)}
            />
            <p className="p-validation-error-login">{invalidInformation}</p>
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
