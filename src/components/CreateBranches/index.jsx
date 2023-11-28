import "./index.scss";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";

const CreateBranches = function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const nombre = useInput("");
  const [correoBlocked, setCorreoBlocked] = useState("");
  const correo = useInput("");
  const telefono = useInput(0);
  const maxCap = useInput(0);
  const opTime = useInput("");
  const clTime = useInput("");
  const [message, setMesagge] = useState("Created Successfully");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/branches/info/${id}`)
        .then((res) => {
          nombre.setValue(res.data.name);
          setCorreoBlocked(res.data.email);
          telefono.setValue(res.data.telephone);
          maxCap.setValue(res.data.capacity);
          opTime.setValue(res.data.openingTime);
          clTime.setValue(res.data.closingTime);
          setMesagge("Updated Successfully");
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, []);

  const createdSuccessfully = () => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const errorMessage = () => {
    toast.error("error creating branch!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleCreateBranch = function (e) {
    e.preventDefault();
    const info = {
      name: nombre.value,
      email: id ? correoBlocked : correo.value,
      telephone: telefono.value,
      openingTime: opTime.value,
      closingTime: clTime.value,
      capacity: maxCap.value,
    };
    axios
      .post("http://localhost:3001/api/branches/", info)
      .then((resp) => {
        console.log(resp);
        createdSuccessfully();
        alert("Se guardó la información");
        navigate("/admin/allBranches");
      })
      .catch((error) => {
        errorMessage();
        return error;
      });

    console.log(info);
  };

  return (
    <div className="bodyContent">
      <form
        action=""
        className="contentCreateBranches"
        onSubmit={handleCreateBranch}
      >
        <div>
          <h1>{id ? "Editar Sucursal" : "Crear una nueva sucursal"}</h1>
        </div>

        <div className="bloqueUno">
          <label htmlFor="nombre">Nombre</label>
          <input
            {...nombre}
            type="text"
            name="name"
            id="nombre"
            placeholder="Ingrese su nombre"
            required
          />
        </div>
        <div className="bloqueUno">
          <label htmlFor="email">Correo electrónico</label>
          {id ? (
            <input
              style={{ backgroundColor: "#E3E3E3", caretColor: "transparent" }}
              value={correoBlocked}
              type="email"
              name="email"
              id="email"
              placeholder="Ingrese su Email"
              readOnly
              required
            />
          ) : (
            <input
              {...correo}
              type="email"
              name="email"
              id="email"
              placeholder="Ingrese su Email"
              required
            />
          )}
        </div>

        <div className="fila">
          <div className="itemFila">
            <label htmlFor="telefono">Teléfono</label>
            <input
              {...telefono}
              type="text"
              name="number"
              id="telefono"
              placeholder="ingrese su numero de Teléfono"
              required
            />
          </div>

          <div className="itemFila itemcierre">
            <label htmlFor="capacidadMaxima">Capacidad máxima</label>
            <input
              {...maxCap}
              type="number"
              name="cupos"
              id="capacidadMaxima"
              required
            />
          </div>
        </div>

        <div className="horario">
          <div className="itemHorario">
            <label htmlFor="H-inicio">Horario de Inicio</label>
            <select
              //value={opTime.value}
              onChange={opTime.onChange}
              name="horarioDeInicio"
              id="inicio"
              className="select-style"
              placeholder="6:00"
              required
            >
              <option disabled selected>
                seleccione un horario de inicio
              </option>
              <option value="6:00AM" selected={opTime.value === "6:00AM"}>
                6:00 am
              </option>
              <option value="7:00AM" selected={opTime.value === "7:00AM"}>
                7:00 am
              </option>
              <option value="8:00AM" selected={opTime.value === "8:00AM"}>
                8:00 am
              </option>
              <option value="9:00AM" selected={opTime.value === "9:00AM"}>
                9:00 am
              </option>
            </select>
          </div>

          <div className="itemHorario  itemcierre">
            <label htmlFor="H-Cierre"> Horario de Cierre</label>
            <select
              //value={clTime.value}
              onChange={clTime.onChange}
              name="horarioDeCierre"
              id="H-Cierre"
              className="select-style"
              placeholder="16:00"
              required
            >
              <option disabled selected>
                seleccione un horario de cierre
              </option>
              <option value="4:00PM" selected={clTime.value === "4:00PM"}>
                4:00 pm
              </option>
              <option value="5:00PM" selected={clTime.value === "5:00PM"}>
                5:00 pm
              </option>
              <option value="6:00PM" selected={clTime.value === "6:00PM"}>
                6:00 pm
              </option>
              <option value="7:00PM" selected={clTime.value === "7:00PM"}>
                7:00 pm
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="submit" className="sumitBtn">
            {id ? "Guardar cambios" : "Crear"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateBranches;
