import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Navbar from "../../commons/Navbar/Navbar";

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
      .then(() => {
        setTimeout(() => {
          window.location.reload();
          user.isAdmin && navigate("/admin/allBranches");
          user.isOperator && navigate("/operator/reservationsList");
          !user.isAdmin &&
            !user.isOperator &&
            user.email &&
            navigate("/client/newReservation");
        }, 1000);
      })
      .catch((err) => {
        setInvalidInformation("¡Email o contraseña incorrectos!");
        console.error(err);
      });
  };

  // const handlePath = () => {
  //   if (user.isAdmin) {
  //     navigate("/admin/allBranches");
  //   } else if (user.isOperator) {
  //     navigate("/operator/reservationsList");
  //   } else if (!user.isAdmin && !user.isOperator && user.email) {
  //     navigate("/client/newReservation");
  //   } else {
  //     navigate("/");
  //   }
  // };

  const handleRecoverPassword = () => {
    const email = prompt("ingrese su email");

    axios
      .post(
        `http://localhost:3001/api/nodeMailer/recoverEmailPassword/${email}`
      )
      .then((resp) => {
        alert("revise su casilla de correo para restaurar su contraseña");
      })
      .catch((error) => {
        alert(
          "se ha producido un error al intentar recuperar su contraseña, intentelo mas tarde"
        );
      });
  };
  const focusNext = document.querySelector(".input-password-focus");
  return (
    <div>
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
              className="input input-password-focus"
              type="password"
              onChange={(e) => setPasswordInputValue(e.target.value)}
              onKeyDown={(e) => e.code === "Enter" && handleSubmit()}
            />
            <p className="p-validation-error-login">{invalidInformation}</p>
            <h4 className="h4-form-login" onClick={handleRecoverPassword}>
              ¿Olvidaste tu contraseña?
            </h4>
            <button className="login-button" onClick={() => handleSubmit()}>
              Ingresar
            </button>
            <div className="login-form-line"></div>
            <button
              className="go-to-register-button"
              onClick={() => navigate("/register")}
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
