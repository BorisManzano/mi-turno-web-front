import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import Button from "@mui/material/Button";
import { red, purple } from "@mui/material/colors";

export const PopupConfirm = (props) => {
    const {onChange, message} = props;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => { //al renderizar el componente , se carga poco a poco
        setIsVisible(true);
      }, []);

  const handleHide = (str) => { //se oculta poco a poco cuando doy click a un boton, luego, se ejecuta la accion
    setIsVisible(false);
    setTimeout(() => {
        onChange(str);
      }, 500); 
  };

  return (
    <div className={`${s.container} ${isVisible ? s.visible : s.hidden}`}>
      <div className={s.card}>
        
        <div className={s.text} dangerouslySetInnerHTML={{ __html: message }}/>
        <br/>
        <br/>
        <div className={s.containerbuttons}>
          <Button
            onClick={(e) => {
                
                e.preventDefault();
                handleHide("accepted");
              
              
            }}
            variant="contained"
            style={{
              backgroundColor: "#A442F1",
              color: "white",
              textTransform: "none",
              padding: "0 !important",
            }}
          >
            Aceptar
          </Button>
          <Button
            onClick={(e) => {
                
                e.preventDefault();
                handleHide("rejected");
              
              
            }}
            variant="contained"
            style={{
              backgroundColor: red[500],
              color: "white",
              textTransform: "none",
            }}
          >
            Cancelar
          </Button>
         
        </div>
      </div>
    </div>
  );
};
