import "./index.scss";
import axios from "axios";
import Navbar from "../../commons/Navbar/Navbar"
const CreateBranches = function () {
 
  const handleCreate = function(e) {
    e.preventDefault()
    const info = {
    nombre :e.target.name.value,
    email: e.target.email.value,
    telefono : e.target.number.value,
    capacidadMaxima :  e.target.cupos.value,
    horarioDeInicio : e.target.horarioDeInicio.value,
    horarioDeCierre: e.target.horarioDeCierre.value,
    }
    // axios.post("path",{info})
    // .then((resp)=> console.log(resp))
    // .catch((error)=>console.log(error))

    console.log(info)

  }
   
  return(
 <div className="bodyContent">
       
        <form action="" className="contentCreateBranches" onSubmit={handleCreate}>
      
      <div className="bloqueUno">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="name" id="nombre" placeholder="Ingrese su nombre"/>
      </div>
      <div className="bloqueUno">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" id="email" placeholder="Ingrese su Email"/>
      </div>

  



    <div className="fila">
        

      <div className="itemFila">      
      <label htmlFor="telefono">Teléfono</label>
      <input type="text" name="number" id="telefono" placeholder="ingrese su numero de Teléfono"/>
      </div>


      <div className="itemFila itemcierre">

         <label htmlFor="capacidadMaxima">Capacidad máxima</label> 
         <input type="number" name="cupos" id="capacidadMaxima" />

      </div>

    </div>

    <div className="horario">

      <div className="itemHorario">
         <label htmlFor="H-inicio">Horario de Inicio</label>
         <select name="horarioDeInicio" id="inicio" className="select-style"placeholder="6:00">
           <option disabled  selected>seleccione un horario de inicio</option>
           <option value="6:00hs">6:00hs</option>       
           <option value="7:00hs">7:00hs</option>      
           <option value="8:00hs">8:00hs</option>      
           <option value="9:00hs">9:00hs</option>      
         </select>
      </div>

      <div className="itemHorario  itemcierre">
         <label htmlFor="H-Cierre"> Horario de Cierre</label>
         <select name="horarioDeCierre" id="H-Cierre" className="select-style" placeholder="16:00">
           <option disabled  selected>seleccione un horario de cierre</option>
           <option value="16:00hs">16:00hs</option>       
           <option value="17:00hs">17:00hs</option>      
           <option value="18:00hs">18:00hs</option>      
           <option value="19:00hs">19:00hs</option>      
         </select>
      </div>
 
   
    </div>
    <div>
    <button type="submit" className="sumitBtn">Enviar</button>
    </div>
  

   </form>
 </div>
    
  )
}

export default CreateBranches;