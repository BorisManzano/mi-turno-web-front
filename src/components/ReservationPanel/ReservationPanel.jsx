import * as React from "react";
import "../ReservationPanel/ReservationPanel.scss";
import Navbar from "../../commons/Navbar/Navbar";

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
import PromotionalMessage from "../../commons/promotional-message";
import axios from "axios";
import { useNavigate } from "react-router";

export default function PanelPrueba() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [enabled, setEnabled] = React.useState(false);
  //...PARA CUANDO HABILITEMOS REDUX :  const date = useSelector((state) => state.date);

  function handleNext() {
    setActiveStep((prev) => prev + 1);
  }
  //HARDCODEO SUCURSALES-------------------------------
  const branches = ["Villa Crespo", "Palermo", "Montevideo", "Cachirulo"];
  //---------------------------------------------
  const [selectedBranch, setSelectedBranch] = React.useState("");
  //-------------------------------------------------------------
  //HARDCODEO HORARIOS------------------------------------------------------
  const schedules = ["10 a 11 hs", "11 a 12 hs", "12 a 13 hs", "13 a 14"];
  //---------------------------------------
  const steps = [
    "Elegí tu sucursal",
    "Seleccioná el día",
    "Completá el formulario",
  ];

  function handleSelection(e) {
    e.preventDefault();
    handleNext();
    setSelectedBranch(e.target.value);
  }

  function handleDaySelector(e) {
    setSelectedDate(e);
    handleNext();
  }

  const [data, setData] = React.useState({
    nombreYApellido: "",
    telefono: "",
    email: "",
  });

  function handleChanges(e) {
    e.preventDefault();
    const { name } = e.target;

    setData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
    setEnabled(true);
  }
  function handleSubmit(e) {
    e.preventDefault();
    //--------ACÁ IRÍA EL PEDIDO POST AL BACK--------------------------
    navigate("/client/reservationConfirmed"); //PARA CUANDO ESTÉN LAS RUTAS
    // axios
    //   .post("http://localhost:3001/api/users/newAppointment", data)
    //   .then(() => {
    //     setData({
    //       nombreYApellido: "",
    //       teléfono: "",
    //       email: "",
    //     });
    // const date = {
    //   id: date.id,
    //   nombreYApellido: date.nombreYApellido,

    //   email: date.email,
    // };
    // dispatch(setDate(date)); //P/CUANDO SE HABILITE REDUX
    // return date;
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    //---------------------------------------------------------------------
  }
  console.log("data", data);
  return (
    <Box
      className="body"
      sx={{
        height: "100vh",
        width: "fixed",

        paddingTop: "7%",

        paddingLeft: "10%",
        backgroundColor: " #f1ebeb",

        overflow: "hidden",
        margin: "auto",
      }}
    >
      <h1 className="title">Hacer una reserva</h1>
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
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            ) : (
              ""
            )}
            <br />
            {activeStep >= 2 ? (
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
                    onChange={handleSelection}
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
                      name="nombreYApellido"
                      value={data.nombreYApellido}
                      type="text"
                      class="form-control"
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
                      name="telefono"
                      value={data.telefono}
                      type="text"
                      class="input"
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
                  name="mail"
                  value={data.mail}
                  type="text"
                  class="form-control"
                  onChange={handleChanges}
                />
                {
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
                }
              </div>
            ) : (
              <Button
                variant="contained"
                disabled={activeStep < 2 || !enabled}
                sx={{
                  width: "200px",
                  marginTop: "5%",
                  marginBottom: "5%",
                  background: "#A442F1",
                }}
              >
                Confirmar reserva
              </Button>
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
          {activeStep === 1 ? (
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
  );
}
