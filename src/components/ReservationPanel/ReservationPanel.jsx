import * as React from "react";
import "../ReservationPanel/ReservationPanel.scss";
import Navbar from "../../commons/Navbar/Navbar";
import PopupReservation from "../../commons/popup-reservation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Button,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Countdown from "../../commons/Countdown";

export default function ReservationPanel() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  // variable para renderizas popup exitoso o de error
  let state = true;

  const [appointment, setAppointment] = React.useState({
    reservationId: "",
    branchId: "",
    branchName: "",
    date: "",
    schedule: "",
    fullname: "",
    telephone: "",
    email: "",
  });
  const [date, setDate] = React.useState(null);
  const [enabled, setEnabled] = React.useState(false);
  const [branches, setBranches] = React.useState([]);
  const [capacity, setCapacity] = React.useState(0);
  const [editing, setEditing] = React.useState(false);
  const [reservationIdParams, setReservationIdParams] = React.useState();

  const { reservationId } = useParams();

  function handleNext() {
    setActiveStep((prev) => prev + 1);
  }
  //TRAIGO DATOS DE LA RESERVA PARA EDITAR y SUCURSALES DEL BACK--------------------------
  React.useEffect(() => {
    if (reservationId) {
      setEditing(true);
      axios
        .get(`http://localhost:3001/api/users/appointment/${reservationId}`)
        .then((result) => {
          console.log("ESTO TRAE RESERVATION ID AXIOS", result);
          const data = {
            reservationId: reservationId,
            branchId: result.data.branchId,
            branchName: result.data.branchName,
            date: result.data.date,
            schedule: result.data.schedule,
            fullname: result.data.createdBy.nameAndLast_name,
            telephone: result.data.createdBy.telephone,
            email: result.data.createdBy.email,
          };

          setAppointment(data);
        })
        .catch((error) => console.log("ERROR AXIOS RESERVATION"));
    } else {
      setEditing(false);
    }

    axios
      .get(`http://localhost:3001/api/branches/allBranches`)
      .then((result) => {
        setBranches(result.data);
      })
      .catch((error) => console.log("NO BRANCHES AVAILABLE"));
  }, [reservationId]);

  //---------------------------------------------
  const [branchName, setBranchName] = React.useState("");
  //-------------------------------------------------------------
  const [branchId, setBranchId] = React.useState(0);
  const [schedule, setSchedule] = React.useState("");
  //HARDCODEO HORARIOS------------------------------------------------------
  const schedules = ["10:00", "11:00", "12:00", "12:15"];
  //---------------------------------------
  const steps = [
    "Elegí tu sucursal",
    "Seleccioná el día",
    "Completá el formulario",
  ];
  //----------------------------------------------------------

  const [activeStep, setActiveStep] = React.useState(
    reservationId ? steps.length : 0
  );
  //--------------------------------------------------------

  function handleSelection(e) {
    e.preventDefault();
    const [id, name, capacity] = e.target.value.split("-");

    setBranchName(name);
    setBranchId(id);
    setCapacity(capacity);
    handleNext();
    setEnabled(true);
  }
  function handleScheduleSelection(e) {
    e.preventDefault();
    setSchedule(e.target.value);
  }
  function handleDaySelector(e) {
    setDate(e.$d);
    handleNext();
  }

  const [data, setData] = React.useState({
    telephone: appointment.telephone,
  });

  function handleChanges(e) {
    e.preventDefault();
    const { name } = e.target;

    setData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
    setEnabled(true);
  }

  const inputs = {
    branchId,
    branchName,
    schedule,
    date,
    fullname: user.fullname,
    email: user.email,
    ...data,
  };

  //FUNCION HANDLE-SUBMIT--------------------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();

    if (!data.telephone) {
      toast.error("DEBE INGRESAR UN TELÉFONO", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    console.log("ESTO MANDA", inputs);
    axios
      .post("http://localhost:3001/api/users/newAppointment", { ...inputs })
      .then((res) => {
        setReservationIdParams(res.data.reservationId);
        console.log("esta es la respuesta", reservationIdParams);
        document
          .querySelector(".body")
          .classList.add("make-reservation-container-inactive");
        document
          .querySelector(".fake-container-popup")
          .classList.remove("fake-container-popup-inactive");
        document
          .querySelector(".fake-container-popup")
          .classList.add("fake-container-popup-active");
      })
      .catch(() =>
        toast.error("ERROR EN EL INGRESO DE DATOS", {
          position: toast.POSITION.TOP_CENTER,
        })
      );
  }

  //HANDLEEDITION------------------------------------------
  function handleEdition(e) {
    e.preventDefault();
    const toPut = { reservationId: reservationId, email: appointment.email };
    for (const key in inputs) {
      if (
        inputs.hasOwnProperty(key) &&
        inputs[key] &&
        inputs[key] !== appointment[key]
      ) {
        toPut[key] = inputs[key];
      }
    }

    axios
      .put("http://localhost:3001/api/users/newAppointment", {
        ...toPut,
      })
      .then(() => {
        document
          .querySelector(".body")
          .classList.add("make-reservation-container-inactive");
        document
          .querySelector(".fake-container-popup")
          .classList.remove("fake-container-popup-inactive");
        document
          .querySelector(".fake-container-popup")
          .classList.add("fake-container-popup-active");
      })
      .catch(() =>
        toast.error("VERIFIQUE QUE LOS DATOS SEAN CORRECTOS", {
          position: toast.POSITION.TOP_CENTER,
        })
      );
  }
  //--------------------------------------------------------
  return (
    <div>
      <Navbar Navbar role={"final-client"} />

      <Box
        className="body"
        sx={{
          height: "85vh",
          width: "fixed",

          paddingTop: "2.5%",

          paddingLeft: "10%",
          backgroundColor: " #f1ebeb",

          overflow: "hidden",
          margin: "auto",
        }}
      >
        {" "}
        <h1
          className="title"
          style={{ display: "flex", alignItems: "flex-start" }}
        >
          Hacer una reserva
        </h1>
        <Grid
          container
          sx={{
            width: "fixed",
            height: "auto",
          }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid
            item
            xs={5}
            sx={{
              backgroundColor: "white",
              padding: "32px 40px 32px 40px",
            }}
          >
            <div
              className="title-panel"
              style={{ fontWeight: "bold", paddingBottom: "10px" }}
            >
              Reserva
            </div>{" "}
            {activeStep === 0 ? (
              <div className="tx-panel">Selecciona tu sucursal</div>
            ) : (
              ""
            )}
            {activeStep === 1 ? (
              <div className="tx-panel">Selecciona el día en el calendario</div>
            ) : (
              ""
            )}
            {activeStep > 1 ? (
              <div className="tx-panel">Completá el formulario</div>
            ) : (
              ""
            )}
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                marginTop: "10%",
                marginBottom: "5px",
                marginRight: "5%",
                marginLeft: "5%",
              }}
            >
              {steps.map((label) => (
                <Step
                  key={label}
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "green",
                    },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "secondary.main",
                    },
                  }}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <FormControl
              xs={12}
              sx={{
                display: "flex",

                width: "100%",
                padding: "12px 12px 8px 12px",
              }}
            >
              <FormLabel
                xs={12}
                sx={{
                  fontWeight: "bolder",
                }}
              >
                Sucursal
              </FormLabel>

              {activeStep >= 0 ? (
                <select
                  xs={12}
                  style={{
                    width: "100",
                    height: "30px",

                    padding: "5px",
                  }}
                  onChange={handleSelection}
                  disabled={enabled}
                >
                  <option value="">
                    {reservationId ? appointment.branchName : ""}
                  </option>
                  {branches.map((branch) => (
                    <option
                      key={branch.id}
                      value={`${branch.id}-${branch.name}-${branch.capacity}`}
                    >
                      {branch.name}
                    </option>
                  ))}
                </select>
              ) : (
                ""
              )}
              <br />
              {activeStep >= 2 && (
                <div
                  xs={12}
                  sx={{
                    width: "100%",
                    height: "auto",
                    fontWeight: "bolder",
                    marginBottom: "10px",
                    padding: "5px",
                  }}
                >
                  <FormLabel
                    xs={12}
                    id="filled-full-width"
                    sx={{
                      width: "100%",
                      fontWeight: "bolder",
                      marginBottom: "20px",
                      padding: "5px",
                    }}
                  >
                    Horario
                    <br />
                    <select
                      style={{ width: "100%", height: "35px" }}
                      onChange={handleScheduleSelection}
                    >
                      <option value="">
                        {reservationId ? appointment.schedule : data.schedule}
                      </option>
                      {schedules.map((schedule) => (
                        <option key={schedule} value={schedule}>
                          {schedule}
                        </option>
                      ))}
                    </select>
                  </FormLabel>
                  <br />
                  <Grid
                    container
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "baseline",
                      marginTop: "15px",
                    }}
                  >
                    <Grid item xs={6}>
                      <FormLabel
                        sx={{
                          marginTop: "15px",
                          fontWeight: "bolder",
                        }}
                      >
                        Nombre y Apellido
                      </FormLabel>

                      <br />

                      <input
                        style={{ width: "90%", height: "30px" }}
                        name="fullname"
                        defaultValue={
                          reservationId ? appointment.fullname : user.fullname
                        }
                        type="text"
                        className="form-control"
                        onChange={handleChanges}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel
                        style={{
                          marginTop: "15px",

                          fontWeight: "bolder",
                        }}
                      >
                        Telefono
                      </FormLabel>
                      <br />
                      <input
                        style={{ width: "100%", height: "30px" }}
                        name="telephone"
                        defaultValue={
                          reservationId ? appointment.telephone : ""
                        }
                        type="text"
                        className="input"
                        onChange={handleChanges}
                      />{" "}
                    </Grid>
                  </Grid>
                  <br />

                  <FormLabel sx={{ marginTop: "10px", fontWeight: "bolder" }}>
                    Mail
                  </FormLabel>
                  <br />
                  <input
                    style={{ width: "100%", height: "30px" }}
                    name="email"
                    defaultValue={
                      reservationId ? appointment.email : user.email
                    }
                    type="text"
                    className="form-control"
                    onChange={handleChanges}
                  />
                  {editing ? (
                    <Button
                      variant="contained"
                      enabled
                      onClick={handleEdition}
                      sx={{
                        marginTop: "5%",
                        marginBottom: "5%",
                        background: "#A442F1",
                      }}
                    >
                      Confirmar edición
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      disabled={activeStep < 2 || !enabled}
                      onClick={handleSubmit}
                      sx={{
                        marginTop: "5%",
                        marginBottom: "5%",
                        background: "#A442F1",
                      }}
                    >
                      Confirmar reserva
                    </Button>
                  )}
                </div>
              )}
            </FormControl>
          </Grid>
          <Grid xs={1}></Grid>

          <Grid
            item
            xs={5}
            sx={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              height: "400px",
              width: "fixed",
            }}
          >
            {activeStep === 1 || editing ? (
              <LocalizationProvider dateAdapter={AdapterDayjs} id="calendar">
                <DateCalendar
                  sx={{ color: "#A442F1" }}
                  onChange={handleDaySelector}
                />
              </LocalizationProvider>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs} id="calendar">
                <DateCalendar sx={{ color: "#A442F1" }} disabled />
              </LocalizationProvider>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            sx={{
              position: "fixed",
              bottom: "150px",
              right: "130px",
              backgroundColor: "#CC6AFF",
              color: "white",
            }}
          >
            <Countdown />
          </Button>
        </Grid>
      </Box>
      <PopupReservation
        state={state}
        reservationId={reservationIdParams || reservationId}
        editing={editing}
      />
      <ToastContainer />
    </div>
  );
}
