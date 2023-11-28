import "./index.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/user";
const AdministratorProfile = function () {
  const date = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { dni, email, fullname } = date;

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
        className="contentPerfilAdm"
        onSubmit={handleUpdateProfile}
      >
        <div>
          {" "}
          <h1> MIS DATOS</h1>{" "}
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="name" id="nombre" defaultValue={fullname} />
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={email}
            readOnly
          />
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="dni">DNI</label>
          <input type="text" name="Dni" id="dni" defaultValue={dni} readOnly />
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            id="password"
            defaultValue={"Default123"}
            readOnly
          />
          <p className="editPassword">Editar Contraseña</p>
        </div>
        <div>
          <button className="perfilBtn">Aceptar</button>
        </div>
      </form>
    </div>
  );
};

export default AdministratorProfile;
