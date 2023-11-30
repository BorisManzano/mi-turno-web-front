import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import useInput from "../../hooks/useInput";
import axios from "axios";

function Reports() {
  const sucursal = useInput("");
  const sucursales = useInput([]);
  const [reservationsList, setReservationsList] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/admin/sucursalesList")
      .then((res) => {
        sucursales.setValue(res.data);
      });
    // axios
    //   .get(`http://localhost:3001/api/users/operator/reservationsList`)
    //   .then((res) => {
    //     setReservationsList(res.data);
    //     console.log(reservationsList);
    //   });
  }, []);

  return (
    <div className={s.dad}>
      <div className={s.firstChild}>
        <label htmlFor="Branch">Filtro por sucursalllll</label>
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
              <option value={suc.name} selected={sucursal.value === suc.name}>
                {suc.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Reports;
