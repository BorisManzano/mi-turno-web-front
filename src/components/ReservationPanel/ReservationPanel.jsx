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
import { login } from "../../state/user";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Countdown from "../../commons/Countdown";

export default function ReservationPanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [reservations, setReservations] = React.useState([]);
  const { reservationId } = useParams();
  const [schedules, setSchedules] = React.useState([]);
  const [notAvailableSchedule, setNotAvilableSchedule] = React.useState("");
  const [reservedDay, setReservedDay] = React.useState([]);
  const [openingTime, setOpeningTime] = React.useState("");
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
          // console.log("ESTO TRAE RESERVATION ID AXIOS", result);
          const data = {
            reservationId: reservationId,
            branchId: result.data.branchId,
            branchName: result.data.branch.name,
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

    const [id, name, capacity, openingTime, closingTime] =
      e.target.value.split("-");
    setOpeningTime(openingTime);
    setBranchName(name);
    setBranchId(id);
    setCapacity(capacity);
    const timeSlots = calculateTimeSlots(openingTime, closingTime, capacity);
    setSchedules(timeSlots);
    const daysWithAppointments = [];
    const allAppointmentsOnBranch = [];
    axios
      .get(`http://localhost:3001/api/appointments/confirmed/${id}`)
      .then((result) => {
        result.data.forEach((appointment) => {
          allAppointmentsOnBranch.push(appointment);
          daysWithAppointments.push(appointment.date);
        });
        let appointmentsByDay = {};
        let notAvailableDate = [];
        // daysWithAppointments.forEach((x) => {
        //   appointmentsByDay[x] = (appointmentsByDay[x] || 0) + 1;
        // });
        OcurrencyChecker(daysWithAppointments, appointmentsByDay);
        for (const day in appointmentsByDay) {
          // console.log("ESTO ES APPO BBY DAY", appointmentsByDay[day]);
          if (timeSlots.length * capacity <= appointmentsByDay[day]) {
            notAvailableDate.push(day);
          }
        }
        setReservations(allAppointmentsOnBranch);
        setReservedDay(notAvailableDate);
      });

    handleNext();
    setEnabled(true);
  }
  function handleDaySelector(e) {
    setDate(e.$d);
    let fulfilledSlots = [];

    reservations.forEach((appointment) => {
      if (dateConversor(e.$d, appointment.date))
        fulfilledSlots.push(appointment.schedule);
    });
    console.log("HORARIOS USADOS", fulfilledSlots);
    let schedulesCounter = {};
    OcurrencyChecker(fulfilledSlots, schedulesCounter);
    let onlyAvailableSchedules = [];
    const filteredSchedules = schedules.filter(
      (schedule) => fulfilledSlots.indexOf(schedule) == -1 //TIENE QUE SER IGUAL A 2
    );
    for (const schedule in schedulesCounter) {
      console.log("schedulescONTUNER[schedule]", schedulesCounter[schedule]);
      if (schedulesCounter[schedule] === capacity - 1) {
        filteredSchedules.push(
          schedule + "   Último turno disponible en este horario!!"
        );
      } else if (schedulesCounter[schedule] < capacity - 1) {
        filteredSchedules.push(schedule);
      }
    }
    console.log(
      "RESULTADO DE schedulesCounter",
      schedulesCounter,
      "ASI QUEDA filteredSchedules",
      filteredSchedules
    );
    setSchedules(filteredSchedules.sort());
    handleNext();
  }

  function handleScheduleSelection(e) {
    e.preventDefault();
    let selectedSchedule;
    if (e.target.value.match(/([A-Za-z¡!])/g)) {
      selectedSchedule = e.target.value.slice(0, 8);
    } else {
      selectedSchedule = e.target.value;
    }
    console.log("ASI QUEDA SELECTEDSCHEDULE", selectedSchedule);
    setSchedule(selectedSchedule);
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
  console.log("ESTE ES EL DATE", date);
  //FUNCION HANDLE-SUBMIT--------------------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    // if (schedule === notAvailableSchedule) {
    //   toast.error("NO HAY DISPONIBILIDAD EN ESE HORARIO", {
    //     position: toast.POSITION.BOTTOM_LEFT,
    //   });
    //   return;
    // }
    if (!data.telephone) {
      toast.error("DEBE INGRESAR UN TELÉFONO", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

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
        dispatch(login({ ...user, phoneNumber: data.telephone }));
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
    // if (schedule === notAvailableSchedule) {
    //   toast.error("NO HAY DISPONIBILIDAD EN ESE HORARIO", {
    //     position: toast.POSITION.BOTTOM_LEFT,
    //   });
    //   return;
    // }
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
        dispatch(login({ ...user, phoneNumber: data.telephone }));
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
                      value={`${branch.id}-${branch.name}-${branch.capacity}-${branch.openingTime}-${branch.closingTime}`}
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
                        readOnly
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
                        readOnly={reservationId ? true : false}
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
                    readOnly
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
                {/* {console.log("REERVATIONS???", reservations)} */}
                <DateCalendar
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "red",
                    },
                  }}
                  disablePast
                  // minTime={openingTime.toJsDate()}
                  onChange={handleDaySelector}
                  shouldDisableDate={(day) =>
                    reservedDay.some((date) => {
                      return dateConversor(day.$d, date);
                    })
                  }
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
//FUNCIONES AUXILIARES----------------------------------
function dateConversor(frontDate, backDate) {
  const materialUidate = new Date(frontDate);
  const sequelizeDate = new Date(backDate);
  const materialUiTime = materialUidate.getTime();
  const sequelizeTime = sequelizeDate.getTime();
  return materialUiTime === sequelizeTime;
}

function calculateTimeSlots(openingTime, closingTime, capacity) {
  let startTime;
  openingTime[0] === "0"
    ? (startTime = openingTime.slice(1, 2))
    : (startTime = openingTime.slice(0, 2));
  const endTime = closingTime.slice(0, 2);
  const availableSlotsForCapacityOfOne = Math.abs(
    parseInt(openingTime) - parseInt(closingTime)
  );

  const totalSlots = Math.floor(60 / 15) * availableSlotsForCapacityOfOne;
  const timeSlots = [];

  for (let i = 0; i < totalSlots; i++) {
    const hour = Math.floor((i * 15) / 60) + parseInt(startTime);
    const minute = (i * 15) % 60;

    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");

    timeSlots.push(`${formattedHour}:${formattedMinute}:00`);
  }

  return timeSlots;
}

function OcurrencyChecker(array, object) {
  return array.forEach((x) => {
    object[x] = (object[x] || 0) + 1;
  });
}
