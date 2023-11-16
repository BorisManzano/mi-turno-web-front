import React from "react";
import s from "../../../components/Register/style.module.scss";

export default function Fullname() {
  return (
    <div>
      <label htmlFor="name" className={s.textInputs}>
        Nombre y Apellido
      </label>
      <input
        type="text"
        name="fullname"
        id="fn"
        placeholder="Nombre Apellido"
        className={s.inputArea}
      />
    </div>
  );
}
