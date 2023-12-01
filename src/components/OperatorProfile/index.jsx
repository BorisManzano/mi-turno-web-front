import "./index.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/user";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import PasswordAndValidations from "../../commons/Form/PasswordAndValidations";

const OperatorProfile = function () {
  const [disabled, setDisabled] = useState(true);
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

  function handleEditPasswordClick(e) {
    e.preventDefault();
    setDisabled(false);
  }

  const date = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
        className="contentOprPerfil"
        onSubmit={handleUpdateProfile}
      >
        <div>
          {" "}
          <h1> MIS DATOS</h1>{" "}
        </div>

        <div className="item-O-P">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="name"
            id="nombre"
            className="inputLogin"
            defaultValue={date.fullname}
          />
        </div>

        <div className="item-O-P">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            className="inputLogin"
            defaultValue={date.email}
            readOnly
          />
        </div>

        <div className="itemFila-O-P">
          <div className="subItemFila">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              name="Dni"
              id="dni"
              defaultValue={date.dni}
              className="inputLogin"
              readOnly
            />
          </div>

          <div className="subItemFilaSelect">
            <label htmlFor="sucursal">Sucursal</label>
            <select
              name="sucursal"
              id="sucursal"
              className="select-style"
              disabled
            >
              <option selected>
                /sucursal a la que pertenece valor por default/
              </option>
              <option value="moreno">moreno</option>
              <option value="puerto madero">puerto madero</option>
              <option value="palermo">palermo</option>
            </select>
          </div>
        </div>
        {disabled ? (
          <div
            style={{
              width: "92%",
              display: "flex",
              justifyContent: "space-between",
            }}
            className="inputs-div-container"
          >
            <div className="single-input-container special-password">
              <p className="p-form-client">Contraseña</p>
              <input
                style={{ width: "100%" }}
                name="password"
                readOnly
                className="inputLogin"
                type="password"
                defaultValue={"Default123"}
                // data-tooltip-id="my-tooltip"
                // data-tooltip-content="Para cambiar tu contraseña debes comunicarte con el administrador"
                // data-tooltip-place="top-start"
              />
            </div>
            <h4
              className="h4-form-edit"
              // data-tooltip-id="my-tooltip"
              // data-tooltip-content="Para cambiar tu contraseña debes comunicarte con el administrador"
              // data-tooltip-place="top-end"
              onClick={handleEditPasswordClick}
            >
              Editar contraseña
            </h4>
            {/* <Tooltip
              id="my-tooltip"
              style={{
                background: "#a442f1",
                borderRadius: "12px",
                fontSize: "13.5px",
                padding: "12px",
              }}
            /> */}
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
        <div className="divBtn">
          <button className="O-perfilBtn">Aceptar</button>
        </div>
      </form>
    </div>
  );
};

export default OperatorProfile;
