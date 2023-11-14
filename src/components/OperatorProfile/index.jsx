import "./index.scss";

const OperatorProfile = function () {
return(
  <div className="bodyContent">

    <form action="" className="contentOprPerfil">
        
      <div> <h1> MIS DATOS</h1> </div>

      <div className="item-O-P">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="name" id="nombre"/>
      </div>

      <div className="item-O-P"> 
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" id="email"/>
      </div>

      <div className="itemFila-O-P">

        <div className="subItemFila">
          <label htmlFor="dni">DNI</label>
          <input type="text" name="Dni" id="dni"/>
        </div>

        <div  className="subItemFilaSelect">
       
          <label htmlFor="sucursal">Sucursal</label>
         <select name="sucursal" id="sucursal" className="select-style">
           <option disabled  selected></option>
           <option value="puerto madero">puerto madero</option>       
           <option value="moreno">moreno</option>      
           <option value="palermo">palermo</option>         
         </select>
        </div>

      </div>
        
      <div className="item-O-P divPassword">
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="contraseña" id="password"/>
        <p className="editPassword">Editar Contraseña</p>
      </div>
      <div className="divBtn">
        <button className="O-perfilBtn">Aceptar</button>
      </div>


    </form>



  </div>
)
}

export default OperatorProfile;