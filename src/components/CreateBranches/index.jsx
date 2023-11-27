import "./index.scss";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const CreateBranches = function () {
  const createdSuccessfully = () => {
    toast.success("branch created successfully!", {
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
      name: e.target.name.value,
      email: e.target.email.value,
      telephone: e.target.number.value,
      openingTime: e.target.horarioDeInicio.value,
      closingTime: e.target.horarioDeCierre.value,
      capacity: e.target.cupos.value,
    };
    axios
      .post("http://localhost:3001/api/branches/newBranch", info)
      .then((resp) => {
        createdSuccessfully();
      })
      .catch((error) => {
        errorMessage();
        return error;
      });
  };

  return (
    <div className="bodyContent">
      <form
        action=""
        className="contentCreateBranches"
        onSubmit={handleCreateBranch}
      >
        <div>
          <h1>Crear una nueva sucursal</h1>
        </div>

        <div className="bloqueUno">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="name"
            id="nombre"
            placeholder="Ingrese su nombre"
            required
          />
        </div>
        <div className="bloqueUno">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Ingrese su Email"
            required
          />
        </div>

        <div className="fila">
          <div className="itemFila">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="text"
              name="number"
              id="telefono"
              placeholder="ingrese su numero de Teléfono"
              required
            />
          </div>

          <div className="itemFila itemcierre">
            <label htmlFor="capacidadMaxima">Capacidad máxima</label>
            <input type="number" name="cupos" id="capacidadMaxima" required />
          </div>
        </div>

        <div className="horario">
          <div className="itemHorario">
            <label htmlFor="H-inicio">Horario de Inicio</label>
            <select
              name="horarioDeInicio"
              id="inicio"
              className="select-style"
              placeholder="6:00"
              required
            >
              <option disabled selected>
                seleccione un horario de inicio
              </option>
              <option value="6:00hs">6:00hs</option>
              <option value="7:00hs">7:00hs</option>
              <option value="8:00hs">8:00hs</option>
              <option value="9:00hs">9:00hs</option>
            </select>
          </div>

          <div className="itemHorario  itemcierre">
            <label htmlFor="H-Cierre"> Horario de Cierre</label>
            <select
              name="horarioDeCierre"
              id="H-Cierre"
              className="select-style"
              placeholder="16:00"
              required
            >
              <option disabled selected>
                seleccione un horario de cierre
              </option>
              <option value="16:00hs">16:00hs</option>
              <option value="17:00hs">17:00hs</option>
              <option value="18:00hs">18:00hs</option>
              <option value="19:00hs">19:00hs</option>
            </select>
          </div>
        </div>
        <div>
          <button type="submit" className="sumitBtn">
            Enviar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateBranches;
