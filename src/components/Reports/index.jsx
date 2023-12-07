import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import useInput from "../../hooks/useInput";
import axios from "axios";
import Bag from "../../assets/Bag";
import Check from "../../assets/Check";
import Wrong from "../../assets/Wrong";
import PieCharts from "../PieCharts";
import LineCharts from "../LineCharts";
import BarCharts from "../BarCharts";

function Reports() {
  const sucursal = useInput("");
  const sucursales = useInput([]);
  const [reservationsList, setReservationsList] = useState([]);
  const [data, setData] = useState([
    { name: "reservations", value: 0 },
    { name: "attended", value: 0 },
    { name: "cancelled", value: 0 },
  ]);
  const [lineData, setLineData] = useState([]);
  const [porcentage, setPorcentage] = useState();

  const fetchAppointments = () => {
    const branchName = sucursal.value;

    axios
      .get(
        `http://localhost:3001/api/users/admin/appointments?branchName=${branchName}`
      )
      .then((res) => {
        const appointments = res.data;

        axios
          .get(`http://localhost:3001/api/metrics/?branchName=${branchName}`)
          .then((metricsRes) => {
            const metricsData = metricsRes.data;

            const uniqueDates = [
              ...new Set(appointments.map((appt) => appt.date)),
            ];

            const dataByDayOfWeek = {
              Monday: {
                dayOfWeek: "Lunes",
                reservations: 0,
                attended: 0,
                cancelled: 0,
              },
              Tuesday: {
                dayOfWeek: "Martes",
                reservations: 0,
                attended: 0,
                cancelled: 0,
              },
              Wednesday: {
                dayOfWeek: "Miércoles",
                reservations: 0,
                attended: 0,
                cancelled: 0,
              },
              Thursday: {
                dayOfWeek: "Jueves",
                reservations: 0,
                attended: 0,
                cancelled: 0,
              },
              Friday: {
                dayOfWeek: "Viernes",
                reservations: 0,
                attended: 0,
                cancelled: 0,
              },
              Saturday: {
                dayOfWeek: "Sábado",
                reservations: 0,
                attended: 0,
                cancelled: 0,
              },
            };

            appointments.forEach((appt) => {
              const dayOfWeek = new Date(appt.date).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                }
              );
              dataByDayOfWeek[dayOfWeek].reservations += 1;
              if (appt.attended) {
                dataByDayOfWeek[dayOfWeek].attended += 1;
              }
            });

            if (metricsData && metricsData.cancelled) {
              const cancelledCount = metricsData.cancelled;
              dataByDayOfWeek.Monday.cancelled += cancelledCount;
              dataByDayOfWeek.Tuesday.cancelled += cancelledCount;
              dataByDayOfWeek.Wednesday.cancelled += cancelledCount;
              dataByDayOfWeek.Thursday.cancelled += cancelledCount;
              dataByDayOfWeek.Friday.cancelled += cancelledCount;
              dataByDayOfWeek.Saturday.cancelled += cancelledCount;
            }

            const transformedData = Object.values(dataByDayOfWeek);

            setReservationsList(appointments);
            const totalReservations = appointments.length;
            const totalAttendances = appointments.filter(
              (appt) => appt.attended
            ).length;
            const attendancePercentage =
              (totalAttendances / totalReservations) * 100;
            const totalCancelled = metricsData.length;
            const pieData = [
              { name: "reservations", value: totalReservations },
              { name: "attended", value: totalAttendances },
              { name: "cancelled", value: totalCancelled },
            ];
            setData(pieData);
            setPorcentage(attendancePercentage);
            setLineData(transformedData);
          })
          .catch((error) => {
            console.error("Error fetching metrics:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/admin/sucursalesList")
      .then((res) => {
        sucursales.setValue(res.data);
      })
      .catch((error) => {
        console.error("Error fetching branches:", error);
      });
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [sucursal.value]);

  return (
    <div className={s.dad}>
      <div className={s.firstChild}>
        <label htmlFor="Branch">Filtro por sucursalllll</label>
        <select
          onChange={sucursal.onChange}
          name="branch"
          id="Branch"
          className={s.inputArea}
          value={sucursal?.value ?? ""}
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
          <option value="">Todas las sucursales</option>
        </select>
      </div>
      <div className={s.cont}>
        <div className={s.number}>
          <div className={s.pos}>
            <div className={s.divis}>
              <p className={s.num}>{data[0].value}</p>
              <p className={s.text}>Total de reservas</p>
            </div>
            <div style={{ width: "89px", height: "89px" }}>
              <Bag width={89} height={89} />
            </div>
          </div>
          <div className={s.borderBtn} />
        </div>
        <div className={s.number}>
          <div className={s.pos}>
            <div className={s.divis}>
              <p className={s.num}>{data[2].value}</p>
              <p className={s.text}>Total de cancelaciones</p>
            </div>
            <div style={{ width: "89px", height: "89px" }}>
              <Wrong width={89} height={89} color="var(--Principal, #A442F1)" />
            </div>
          </div>
          <div className={s.borderBtn} />
        </div>
        <div className={s.number}>
          <div className={s.pos}>
            <div className={s.divis}>
              <p className={s.num}>{data[1].value}</p>
              <p className={s.text}>Total de asistencias</p>
            </div>
            <div style={{ width: "89px", height: "89px" }}>
              <Check width={89} height={89} color="var(--Principal, #A442F1)" />
            </div>
          </div>
          <div className={s.borderBtn} />
        </div>
      </div>
      <div className={s.order}>
        <div className={s.pie}>
          <PieCharts data={data} />
          <div className={s.row}>
            <div className={s.pieOrder}>
              <div className={s.block}></div>
              <p>Reservas {Math.round(100 - porcentage)}%</p>
            </div>
            <div className={s.pieOrder}>
              <div className={s.block2}></div>
              <p>Asistencias {Math.round(porcentage)}%</p>
            </div>
          </div>
        </div>
        <div className={s.pie2}>
          <LineCharts data={lineData} />
        </div>
      </div>
      <div className={s.bar}>
        <BarCharts data={data} />
      </div>
    </div>
  );
}

export default Reports;
