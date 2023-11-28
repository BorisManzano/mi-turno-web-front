import { useEffect, useState } from "react";
import s from "./style.module.scss";
import Fullname from "../../commons/Form/Fullname";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { useNavigate, useParams } from "react-router";

const CreateOperator = function () {
  const navigate = useNavigate();
  const { dni } = useParams();
  const fullname = useInput("");
  const [emailBlocked, setEmailBlocked] = useState("");
  const email = useInput("");
  const dni_ = useInput(0);
  const sucursal = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");
  const sucursales = useInput([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/admin/sucursalesList")
      .then((res) => {
        sucursales.setValue(res.data);
      });

    if (dni) {
      axios
        .get(`http://localhost:3001/api/users/operator/info/${dni}`)
        .then((res) => {
          fullname.setValue(res.data.operator.fullname);
          setEmailBlocked(res.data.operator.email);
          dni_.setValue(res.data.operator.DNI);
          sucursal.setValue(res.data.name);
        });
    }
  }, []);

  //const [password, setPassword] = useState("");
  // const [confirmPswd, setConfirmPswd] = useState("");
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState({});
  // const fakeData = ["sucursal 1", "Sucursal 2", "Sucursal 3"];

  const handleToggleFocus = () => {
    setFocus(!focus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //if(fullname.value !== "" && dni_.value !== 0 && sucursal.value !== "" && (email.value !== "" || emailBlocked != "")){
    let data = {
      fullname: fullname.value,
      DNI: dni_.value,
      email: dni ? emailBlocked : email.value,
      branch: sucursal.value,
      isOperator: true,
    };
    if (password.value != "" && confirmPassword.value == password.value)
      data = { ...data, password: password.value };

    axios

      .post("http://localhost:3001/api/users/operator", data, {
        withCredentials: true,
      })
      .then(() => {
        alert("se guardo la información");
        navigate("/admin/operators");
      })
      .catch((err) => console.error(err));
    //}
    // else{
    //   alert("Rellene todos los campos!");
    // }
  };

  return (
    <>
      <div className={s.parent}>
        <form onSubmit={handleSubmit} className={s.f}>
          <h1>{dni ? "Editar Operador" : "Crear Operador"}</h1>
          <div className={s.inputMail}>
            <Fullname
              value={fullname.value}
              handleInputChange={fullname.onChange}
            />
          </div>
          <div className={s.inputMail}>
            <label htmlFor="email" className={s.textInputs}>
              Mail
            </label>
            {dni ? (
              <input
                style={{
                  backgroundColor: "#E3E3E3",
                  caretColor: "transparent",
                }}
                type="email"
                name="email"
                id="em"
                value={emailBlocked}
                disabled
                required
              />
            ) : (
              <input
                {...email}
                type="email"
                name="email"
                id="em"
                autoComplete="username"
                placeholder="ejemplo_nombre@ejemplo.com"
                required
              />
            )}
          </div>
          <div className={s.rowForm}>
            <div>
              <label htmlFor="dni" className={s.textInputs}>
                DNI
              </label>
              <input
                {...dni_}
                type="text"
                id="DNI"
                name="DNI"
                maxLength="8"
                pattern="[0-9]{1,8}"
                placeholder="9999999"
                className={s.inputArea}
              />
            </div>
            <div className={s.allInputs}>
              <label htmlFor="Branch">Sucursal</label>
              <select
                onChange={sucursal.onChange}
                name="branch"
                id="Branch"
                className={s.inputArea}
                value={data.branch}
              >
                <option disabled value="" selected>
                  seleccione una sucursal
                </option>
                {sucursales.value.map((suc) => {
                  return (
                    <option
                      value={suc.name}
                      selected={sucursal.value === suc.name}
                    >
                      {suc.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={s.rowForm}>
            <div>
              <label htmlFor="password" className={s.textInputs}>
                {dni ? "Nueva Contraseña (opcinal)" : "Contraseña"}
              </label>
              <div
                className={
                  focus
                    ? password.value === confirmPassword.value
                      ? s.focus
                      : s.err
                    : s.inputArea
                }
              >
                <input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="contraseña"
                  className={s.inputPassword}
                  {...password}
                  onFocus={handleToggleFocus}
                  onBlur={handleToggleFocus}
                  required={dni == null}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className={s.textInputs}>
                Repetir Contraseña
              </label>
              <div
                className={
                  focus
                    ? password.value === confirmPassword.value
                      ? s.focus
                      : s.err
                    : s.inputArea
                }
              >
                <input
                  type="text"
                  name="cpassword"
                  id="cpassword"
                  placeholder="contraseña"
                  {...confirmPassword}
                  className={s.inputPassword}
                  onFocus={handleToggleFocus}
                  onBlur={handleToggleFocus}
                  required={dni == null}
                />
              </div>
            </div>
          </div>
          <button type="submit" className={s.btnSingIn}>
            <h3>{dni ? "Guardar Cambios" : "Registrar"}</h3>
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateOperator;
