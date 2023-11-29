import "./index.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/user";
const OperatorProfile = function () {
  const date = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const info = {
      fullname: e.target.name.value,
      email: e.target.email.value,
    };

    axios
      .put("http://localhost:3001/api/users/edit/profile", info)
      .then((resp) => {
        const payload = {
          fullname: resp.data.fullname,
          email: resp.data.email,
          dni: resp.data.DNI,
          telephone: null,
        };

        dispatch(login(payload));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bodyContent">
      <form
        action=""
        className="contentOprPerfil"
        onSubmit={handleUpdateProfile}
      >
        <div>
          {" "}
          <h1> MIS DATOS</h1>{" "}
        </div>

        <div className="item-O-P">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="name"
            id="nombre"
            defaultValue={date.fullname}
          />
        </div>

        <div className="item-O-P">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={date.email}
            readOnly
          />
        </div>

        <div className="itemFila-O-P">
          <div className="subItemFila">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              name="Dni"
              id="dni"
              defaultValue={date.dni}
              readOnly
            />
          </div>

          <div className="subItemFilaSelect">
            <label htmlFor="sucursal">Sucursal</label>
            <select
              name="sucursal"
              id="sucursal"
              className="select-style"
              disabled
            >
              <option selected>
                /sucursal a la que pertenece valor por default/
              </option>
              <option value="moreno">moreno</option>
              <option value="puerto madero">puerto madero</option>
              <option value="palermo">palermo</option>
            </select>
          </div>
        </div>
        <div style={{ width: "92%" }} className="inputs-div-container">
          <div className="single-input-container special-password">
            <p className="p-form-client">Contraseña</p>
            <input
              name="password"
              readOnly
              className="input"
              type="password"
              defaultValue={"Default123"}
            />
          </div>
          <h4
            className="h4-form-edit"
            // onClick={handleEditPasswordClick}
          >
            Editar contraseña
          </h4>
        </div>
        {/* <div className="item-O-P divPassword">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            id="password"
            defaultValue={"default123"}
            readOnly
          />
          <p className="editPassword">Editar Contraseña</p>
        </div> */}
        <div className="divBtn">
          <button className="O-perfilBtn">Aceptar</button>
        </div>
      </form>
    </div>
  );
};

export default OperatorProfile;
