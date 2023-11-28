import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import ArrowLeft from "../../assets/ArrowLeft";
import Check from "../../assets/Check";
import Eye from "../../assets/Eye";
import Wrong from "../../assets/Wrong";
import Fullname from "../../commons/Form/Fullname";
import s from "./style.module.scss";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: "",
    DNI: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
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

  const returnLogin = () => {
    navigate("/login");
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
    if (!checklist.validation) {
      alert("validation");
    } else if (data.password !== confirmPswd) {
      alert("Las contraseñas deben ser iguales");
    } else {
      axios

        .post("http://localhost:3001/api/users/register", data,{
          withCredentials: true,
        })
        .then((resp) => {
          console.log("Registro exitoso");
          axios.post(`http://localhost:3001/api/nodeMailer/accountConfirmation/${resp.data.email}`)
        })
        .then(()=> navigate("/") )
        .catch((err) => {
          setError(err.response.data.error);
        });
    }
  };
  console.log(error);

  return (
    <>
      <div className={s.divs}>
        <form className={s.f} onSubmit={handleSubmit}>
          <div className={s.head}>
            <button onClick={returnLogin} className={s.none}>
              <ArrowLeft className={s.none} />
              Atras
            </button>
            <h1 className={s.textTittle}>Crear cuenta</h1>
          </div>
          <div className={s.inputs}>
            <div className={s.rowForm}>
              <Fullname
                value={data.name}
                handleInputChange={handleInputChange}
              />
              <div>
                <label htmlFor="DNI" className={s.textInputs}>
                  DNI
                </label>
                <input
                  type="text"
                  id="DNI"
                  name="DNI"
                  maxLength="8"
                  pattern="[0-9]{7,8}"
                  placeholder="9999999"
                  value={data.DNI}
                  onChange={handleInputChange}
                  className={s.inputArea}
                />
              </div>
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
                <label htmlFor="password" className={s.textInputs}>
                  Contraseña
                </label>
                <div
                  className={
                    focus && data.password === confirmPswd
                      ? s.focus
                      : data.password !== confirmPswd
                      ? s.err
                      : s.inputArea
                  }
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                    value={data.password}
                    className={s.inputPassword}
                    autoComplete="new-password"
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
                    focus && data.password === confirmPswd
                      ? s.focus
                      : data.password !== confirmPswd
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
                    autoComplete="new-password"
                    onChange={handleInputConfirmPswd}
                    onFocus={handleToggleFocus}
                    onBlur={handleToggleFocus}
                    onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}
                  />
                  <div onClick={handleToggleConfirmPassword}>
                    <Eye />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.warning}>
            {data.password === "" ? (
              <p className={s.marg2}>La contraseña debe contener:</p>
            ) : (
              <p className={s.marg}>La contraseña debe contener:</p>
            )}

            <div className={s.bBorder}></div>
            <div className={s.container}>
              <div className={s.rowOne}>
                {data.password === "" ? (
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
                {data.password === "" ? (
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
            </div>
          </div>
          {error ? <p className={s.error}>{error}</p> : <></>}
          <button className={s.btnSingIn} type="submit">
            <h3>Registrarme</h3>
          </button>
          <div className={s.bBorder}></div>
          <button onClick={returnLogin} className={s.btnLog}>
            ¿Ya tenés cuenta? Iniciá sesión
          </button>
        </form>
      </div>
    </>
  );
}
