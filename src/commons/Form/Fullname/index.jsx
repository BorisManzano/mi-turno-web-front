import React from "react";
import s from "../../../components/Register/style.module.scss";

export default function Fullname({ value, handleInputChange }) {
  return (
    <div>
      <label htmlFor="name" className={s.textInputs}>
        Nombre y Apellido
      </label>
      <input
        type="text"
        name="fullname"
        id="fn"
        value={value}
        placeholder="Nombre Apellido"
        className={s.inputArea}
        onChange={handleInputChange}
      />
    </div>
  );
}
