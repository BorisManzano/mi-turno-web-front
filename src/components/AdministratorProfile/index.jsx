import "./index.scss";

const AdministratorProfile = function () {
  
return(
  
  <div className="bodyContent">

     <form action="" className="contentPerfilAdm">

       <div> <h1> MIS DATOS</h1>  </div>

       <div className="itemPerfilAdm">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="name" id="nombre"/>
       </div>
       
       <div className="itemPerfilAdm">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" id="email"/>
       </div>

       <div className="itemPerfilAdm">
          <label htmlFor="dni">DNI</label>
          <input type="text" name="Dni" id="dni"/>
       </div>

       <div className="itemPerfilAdm">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="contraseña" id="password"/>
          <p className="editPassword">Editar Contraseña</p>
       </div>
       <div>
         <button className="perfilBtn">Aceptar</button>
       </div>

     </form>
  </div>
)

}

export default AdministratorProfile;