import "./index.scss";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/user";
import PasswordAndValidations from "../../commons/Form/PasswordAndValidations";
import s from "../Register/style.module.scss";

const AdministratorProfile = function () {
  const [data, setData] = useState({
    fullname: "",
    DNI: "",
    email: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focus, setFocus] = useState(false);
  const [checklist, setChecklist] = useState({
    uppercaseLetter: false,
    lowercaseLetter: false,
    oneNumber: false,
    large: false,
    validation: false,
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
    setData({ ...data, password: newValue });
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

  const date = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const { dni, email, fullname } = date;
  function handleEditPasswordClick(e) {
    e.preventDefault();
    setDisabled(false);
  }
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const info = {
      fullname: e.target.name.value,
      email: e.target.email.value,
    };
    axios
      .put("http://localhost:3001/api/users/edit/profile", info)
      .then((resp) => {
        const payload = {
          fullname: resp.data.fullname,
          email: resp.data.email,
          dni: resp.data.DNI,
          telephone: null,
        };
        dispatch(login(payload));
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bodyContent">
      <form
        action=""
        className="contentPerfilAdm"
        onSubmit={handleUpdateProfile}
      >
        <div>
          {" "}
          <h1> MIS DATOS</h1>{" "}
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="name" id="nombre" defaultValue={fullname} />
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={email}
            readOnly
          />
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="dni">DNI</label>
          <input type="text" name="Dni" id="dni" defaultValue={dni} readOnly />
        </div>
        {disabled ? (
          <div style={{ width: "801px" }} className="inputs-div-container">
            <div className="single-input-container special-password">
              <p className="p-form-client">Contraseña</p>
              <input
                disabled={true}
                name="password"
                readOnly
                className={s.inputAreaPV}
                type="password"
                defaultValue={"Default123"}
              />
            </div>
            <h4 className="h4-form-edit" onClick={handleEditPasswordClick}>
              Editar contraseña
            </h4>
          </div>
        ) : (
          <PasswordAndValidations
            value={data.password}
            handleInputConfirmPswd={handleInputConfirmPswd}
            handleInputPassword={handleInputPassword}
            handleToggleFocus={handleToggleFocus}
            handleTogglePassword={handleTogglePassword}
            handleToggleConfirmPassword={handleToggleConfirmPassword}
            confirmPswd={confirmPswd}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            checklist={checklist}
            focus={focus}
          />
        )}
        <div>
          <button className="perfilBtn">Aceptar</button>
        </div>
      </form>
    </div>
  );
};

export default AdministratorProfile;
