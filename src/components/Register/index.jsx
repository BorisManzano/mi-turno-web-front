import React, { useState } from "react";
import s from "./style.module.scss";
import Eye from "../../assets/Eye";
import Check from "../../assets/Check";
import Wrong from "../../assets/Wrong";
import Close from "../../assets/Close";
import ArrowLeft from "../../assets/ArrowLeft";

export default function Register(params) {
  const [dni, setDNI] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    setDNI(newValue);
  };

  return (
    <div className={s.divs}>
      <form className={s.f}>
        <div className={s.head}>
          <button className={s.none}>
            <ArrowLeft />
            Back
          </button>
          <h1>Create account</h1>
        </div>
        <div>
          <label htmlFor="name">Fullname</label>
          <input type="text" name="fullname" id="fn" placeholder="Fullname" />
        </div>
        <div>
          <label htmlFor="dni">DNI</label>
          <input
            type="text"
            id="dni"
            name="dni"
            maxLength="8"
            pattern="[0-9]{1,8}"
            title="El DNI debe tener entre 1 y 8 dígitos numéricos"
            value={dni}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="em"
            placeholder="example_name@example.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="pswd"
            placeholder="password"
          />
          <Eye />
        </div>
        <div>
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="password"
            id="pswd"
            placeholder="password"
          />
          <Eye />
        </div>
        <div className={s.warning}>
          <p>La contraseña debe tener:</p>
          <div className={s.bBorder}></div>
          <div>
            <div className={s.row1}>
              <Check /> <p>ABC</p> <p>Una letra mayúscula</p>
            </div>
            <div className={s.row1}>
              <Check /> <p>abc</p> <p>Una letra minúscula</p>
            </div>
          </div>
          <div>
            <div className={s.row1}>
              <Wrong /> <p>123</p> <p>Una número</p>
            </div>
            <div className={s.row1}>
              <Check /> <p>***</p> <p>Mínimo 8 caracteres</p>
            </div>
          </div>
        </div>
        <button>Sign up</button>
        <div className={s.bBorder}></div>
        <button className={s.btnLog}>
          Do you already have an account? Log in.
        </button>
      </form>
    </div>
  );
}
