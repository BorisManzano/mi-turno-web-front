import * as React from "react";
import "../ReservationPanel/ReservationPanel.scss";
import Navbar from "../../commons/Navbar/Navbar";
import PopupReservation from "../../commons/popup-reservation";
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

import axios from "axios";
import { useNavigate, useParams } from "react-router";

export default function ReservationPanel() {
  const navigate = useNavigate();
  // variable para renderizas popup exitoso o de error
  let state = true;

  const [appointment, setAppointment] = React.useState({
    reservationId: "",
    branchId: "",
    branchName: "",
    date: "",
    schedule: "",
  });
  const [date, setDate] = React.useState(null);
  const [enabled, setEnabled] = React.useState(false);
  const [branches, setBranches] = React.useState([]);

  const reservationId = useParams();
  function handleNext() {
    setActiveStep((prev) => prev + 1);
  }
  //TRAIGO DATOS DE LA RESERVA PARA EDITAR y SUCURSALES DEL BACK--------------------------
  React.useEffect(() => {
    if (!appointment.reservationId && reservationId) {
      axios
        .get(`http://localhost:3001/api/users/appointment/${reservationId}`)
        .then((result) => {
          const data = {
            branchId: result.branchId,
            branchName: result.branchName,
            date: result.date,
            schedule: result.schedule,
          };
          setAppointment(data);
        });
    }

    axios
      .get(`http://localhost:3001/api/branches/allBranches`)
      .then((result) => {
        console.log("BRANCHES LLEGA----", result);
        setBranches(result.data);
      })
      .catch((error) => console.log(error));
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
    !appointment.email ? 0 : steps.length
  );
  //--------------------------------------------------------

  function handleSelection(e) {
    e.preventDefault();
    const [id, name] = e.target.value.split("-");
    setBranchName(name);
    setBranchId(id);
    handleNext();
  }
  function handleScheduleSelection(e) {
    e.preventDefault();
    setSchedule(e.target.value);
    handleNext();
  }
  function handleDaySelector(e) {
    setDate(e.$d);

    handleNext();
  }

  const [data, setData] = React.useState({
    fullname: appointment.fullname,
    telephone: appointment.telephone,
    email: appointment.email,
  });

  function handleChanges(e) {
    e.preventDefault();
    const { name } = e.target;

    setData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
    setEnabled(true);
  }

  const inputs = { branchId, branchName, schedule, date, ...data };

  // console.log("INPUTS------------>", inputs);

  //FUNCION HANDLE-SUBMIT--------------------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/users/newAppointment", { ...inputs }) //en funcionamiento.
      .then(() => {
        const newAppointment = {
          branchId: inputs.branchId,
          branchName: inputs.branchName,
          date: inputs.date.toISOString(),
          schedule: inputs.schedule,
        };

        document
          .querySelector(".body")
          .classList.add("make-reservation-container-inactive");
        document
          .querySelector(".fake-container-popup")
          .classList.remove("fake-container-popup-inactive");
        document
          .querySelector(".fake-container-popup")
          .classList.add("fake-container-popup-active");
        setAppointment(newAppointment);
      })
      .catch(function (error) {
        state = false;
        console.log(error);
      });

    navigate(); //VUELVE A RENDERIZAR LA PÁGINA CON LOS NUEVOS DATOS
  }
  //HANDLEEDITION------------------------------------------
  function handleEdition(e) {
    e.preventDefault();

    axios
      .put("http://localhost:3001/api/users/newAppointment", {
        ...inputs,
        reservationId,
      })
      .then(() => {
        const newAppointment = {
          branchId: inputs.branchId,
          branchName: inputs.branchName,
          date: inputs.date,
          schedule: inputs.schedule,
        };
        setAppointment(newAppointment);
      })
      .catch(function (error) {
        console.log(error);
      });

    navigate("/client/reservations");
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
                >
                  <option value=""></option>
                  {branches.map((branch) => (
                    <option
                      key={branch.id}
                      value={`${branch.id}-${branch.name}`}
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
                      <option value=""></option>
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
                        value={data.fullname}
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
                        value={data.telephone}
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
                    value={data.email}
                    type="text"
                    className="form-control"
                    onChange={handleChanges}
                  />
                  {appointment.schedule ? (
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
            {activeStep === 1 || appointment.date ? (
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
            Quedan 4:52
          </Button>
        </Grid>
      </Box>
      <PopupReservation state={state} />
    </div>
  );
}
