import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PopupConfirm } from "../PopupConfirm";

export const TableList = ({ datatype, data_ }) => {
  const [data, setData] = useState(data_);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const handleOnClickEdit = (rid, e) => {
    //validar para distintos botones
    e.preventDefault();
    navigate(`/client/editReservation/${rid}`);
  };
  const handleOnClickCancel = (rid, e) => {
    e.preventDefault();
    navigate(`/client/cancelReservation/${rid}`);
  };

  //============================================================
  const [showPopUpConfirm, setShowPopUpConfirm] = useState(false);
  const [estadoSubmit, setEstadoSubmit] = useState("none");
  const [deleteInfo, setDeleteInfo] = useState("");

  const manejarCambio = (nuevoEstado) => {
    setEstadoSubmit(nuevoEstado);
    console.log(estadoSubmit);
  };

  const handleConditionDelete = (info, e) => {
    setDeleteInfo(info);
    e.preventDefault();
    setShowPopUpConfirm(true);
  };

  const handleDeleteOperator = (oid, e) => {
    if (e) e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}:3001/api/users/admin/deleteOperator/${oid}`
      )
      .then(() => {
        const newData = data.filter((obj) => obj.id != oid);
        if (newData.length == 0) window.location.reload();
        else {
          setData(newData);
          toast.success("Se eliminó al operador", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  const handleDeleteBranch = (id, e) => {
    if (e) e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}:3001/api/users/admin/deleteBranch/${id}`
      )
      .then(() => {
        const newData = data.filter((obj) => obj.id != id);
        if (newData.length == 0) window.location.reload();
        else {
          setData(newData);
          toast.success("Se eliminó la sucursal", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  useEffect(() => {
    if (estadoSubmit == "accepted") {
      setEstadoSubmit("none");
      setShowPopUpConfirm(false);
      dataType === "Sucursales"
        ? handleDeleteBranch(deleteInfo)
        : handleDeleteOperator(deleteInfo);
    } else {
      setEstadoSubmit("none");
      setShowPopUpConfirm(false);
    }
  }, [estadoSubmit]);

  const dataType = datatype;
  const objKeys = Object.keys(data[0]);

  let column1 = "";
  let column2 = "";
  let column3 = "";
  let column4 = "";
  let popUpMessage = "";

  if (dataType === "Sucursales") {
    column1 = "Nombre";
    column2 = "Correo";
    column3 = "Capacidad";
    column4 = "Horario de Inicio y cierre";
    popUpMessage =
      "<h2>¿Estás seguro que quieres eliminar la sucursal?</h2><br/>Se eliminarán las reservas asociadas a la sucursal y la asociación al operador.<br/><p>Contacta a los clientes de ser necesario.</p>";
  } else if (dataType === "Operadores") {
    column1 = "Nombre y Apellido";
    column2 = "Mail";
    column3 = "Sucursal";
    column4 = "DNI";
    popUpMessage =
      "<h2>¿Estás seguro que quieres eliminar al operador?</h2><br/>Se eliminará la información del mismo y su asociación a la sucursal.<br/><p>Asigna a otro operador de ser necesario.</p>";
  } else if (dataType === "Reservas") {
    column1 = "N° reserva";
    column2 = "Sucursal";
    column3 = "Fecha y hora";
    column4 = "Teléfono";
  } else if (dataType === "OperatorReservas") {
    column1 = "Usuario";
    column2 = "N° reserva";
    column3 = "Fecha y hora";
    column4 = "Sucursal";
  }
  //puede ser operadores, sucursales o historial de reservas.
  // funcion confirmacion de reserva de parte del operador

  const handleConfirmedAssistence = (id, e) => {
    const button = document.getElementById(`${id}`);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}:3001/api/appointments/attended/${id}`
      )
      .then(() => {
        return toast.success("Asistencia confirmada", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch(() =>
        toast.error("No fue posible confirmar la asistencia", {
          position: toast.POSITION.TOP_CENTER,
        })
      );
    button.disabled = true;
    button.innerText = "Confirmado ✓";
    button.onClick = null;
    window.location.reload();
  };
  return (
    <>
      {showPopUpConfirm && (
        <PopupConfirm onChange={manejarCambio} message={popUpMessage} />
      )}
      <div className={s.container} style={{ marginTop: "1.5%" }}>
        <div
          className={s.headerContainer}
          style={{ display: dataType === `Sucursales` ? `flex` : `none` }}
        >
          <div className={s.filtersContainer}>
            <h3>Filtrar : </h3>
            <button
              onClick={() =>
                setFilter(filter === `without` ? `all` : `without`)
              }
            >
              Sin operador
            </button>
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Haz click nuevamente para quitar el filtro!"
              data-tooltip-place="top-end"
              onClick={() => setFilter(filter === `with` ? `all` : `with`)}
            >
              Con operador
            </button>
          </div>
          <div className={s.titleContainer}>
            <h1>{`Sucursales`}</h1>
          </div>
          <div className={s.nothingContainer} style={{ color: "white" }}>
            .
          </div>
        </div>
        <h1
          style={{
            margin: "3% 0 2% 0",
            display: dataType === `Sucursales` ? `none` : `block`,
          }}
        >
          {dataType === "OperatorReservas" ? "Reservas" : dataType}
        </h1>
        <div className={s.table}>
          {data.map((objIns, i) => {
            {
              if (filter === "without") {
                if (objIns.operator) {
                  return;
                }
              } else if (filter === "with") {
                if (!objIns.operator) {
                  return;
                }
              }
            }
            return (
              objIns[objKeys[0]] != "" && (
                <div className={s.row} key={i}>
                  <div className={s.rowItem}>
                    <p>{column1}</p>
                    <b>{objIns[objKeys[0]]}</b>
                    {dataType === "Sucursales" && !objIns[objKeys[5]] && (
                      <p style={{ color: red[500] }}>(Sin operador)</p>
                    )}
                  </div>
                  <div className={s.rowItem}>
                    <p>{column2}</p>
                    <b>{objIns[objKeys[1]]}</b>
                  </div>
                  <div className={s.rowItem}>
                    <p>{column3}</p>

                    {dataType.includes("Reservas") ? (
                      <b>
                        <>{objIns[objKeys[2]].split("T")[0]} </>
                        &nbsp; · &nbsp;
                        <>{objIns[objKeys[4]].slice(0, 5)}hs</>
                      </b>
                    ) : objIns[objKeys[2]] == "Sin asignar" ? (
                      <b style={{ color: red[500] }}>Sin asignar</b>
                    ) : (
                      <b>{objIns[objKeys[2]]}</b>
                    )}
                  </div>
                  <div className={s.rowItem}>
                    <p>{column4}</p>
                    <b>{objIns[objKeys[3]]}</b>
                  </div>
                  <div className={s.rowItem}>
                    {datatype === "Operadores" && (
                      <div className="horiz">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(
                              `/admin/edit/operador/${objIns[objKeys[3]]}`
                            );
                          }}
                          variant="contained"
                          style={{
                            backgroundColor: "#F5F5F5",
                            color: "#A442F1",
                            textTransform: "none",
                            padding: "0 !important",
                          }}
                        >
                          Editar
                        </Button>
                        &nbsp; &nbsp;
                        <Button
                          onClick={(event) =>
                            handleConditionDelete(objIns[objKeys[4]], event)
                          }
                          variant="contained"
                          style={{
                            backgroundColor: red[500],
                            color: "white",
                            textTransform: "none",
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    )}
                    {datatype === "Sucursales" && (
                      <div className="horiz">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(
                              `/admin/edit/branch/${objIns[objKeys[4]]}`
                            ); //recibe adicion almente el id de la sucursal
                          }}
                          variant="contained"
                          style={{
                            backgroundColor: "#F5F5F5",
                            color: "#A442F1",
                            textTransform: "none",
                            padding: "0 !important",
                          }}
                        >
                          Editar
                        </Button>
                        &nbsp; &nbsp;
                        <Button
                          onClick={(event) =>
                            handleConditionDelete(objIns[objKeys[4]], event)
                          }
                          variant="contained"
                          style={{
                            backgroundColor: red[500],
                            color: "white",
                            textTransform: "none",
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    )}
                    {dataType === "OperatorReservas" && (
                      <Button
                        id={`${objIns[objKeys[1]]}`}
                        variant="contained"
                        style={
                          objIns[objKeys[5]] === false
                            ? {
                                backgroundColor: "#F5F5F5",
                                color: "#A442F1",
                                textTransform: "none",
                                padding: "0 !important",
                              }
                            : {
                                backgroundColor: "#b93af8",
                                color: "white",
                                textTransform: "none",
                                padding: "0 !important",
                              }
                        }
                        onClick={(event) =>
                          objIns[objKeys[5]] === false
                            ? handleConfirmedAssistence(
                                objIns[objKeys[1]],
                                event
                              )
                            : ""
                        }
                      >
                        {objIns[objKeys[5]] === false
                          ? "Confirmar"
                          : "Confirmado ✓"}
                      </Button>
                    )}

                    {dataType === "Reservas" && (
                      <div className="horiz">
                        <Button
                          onClick={(event) =>
                            handleOnClickEdit(objIns[objKeys[0]], event)
                          }
                          variant="contained"
                          style={{
                            backgroundColor: "#F5F5F5",
                            color: "#A442F1",
                            textTransform: "none",
                            padding: "0 !important",
                          }}
                        >
                          Editar
                        </Button>
                        &nbsp; &nbsp;
                        <Button
                          onClick={(event) =>
                            handleOnClickCancel(objIns[objKeys[0]], event)
                          }
                          variant="contained"
                          style={{
                            backgroundColor: red[500],
                            color: "white",
                            textTransform: "none",
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )
            );
          })}
          <ToastContainer />
        </div>
      </div>
      <Tooltip id="my-tooltip" className={s.myTooltip} />
    </>
  );
};
