import React from "react";
import swal from "@sweetalert/with-react";
import {useNavigate, Navigate} from "react-router-dom"

function Buscador() {

  // protego la ruta para que si no esta logeado no puede acceder
    const token = sessionStorage.getItem("token");

    const currentPath = useNavigate();

    const handleSubmit = (e)=>{

        e.preventDefault();

        // el metodo trim elimina espacios vacios adelante y detras de una oracion9no elimina los del medio) asi estoy poniendo una validacion por si me introducen la palabra con un espacio antes o despues
        const key = e.target.keyword.value.trim();
        // console.log(key);

        // aca le digo que minimo ponga cuatro letras para poder buscar sino le aviso del error 
        if (key.length === 0) {
            swal(<h2>Empty search</h2>)
        } else if (key.length < 4){
            swal(<h2>You must enter at least 4 characters</h2>)
        } else {
            e.target.keyword.value = "";
            currentPath(`/resultados?keyword=${key}`);
        }

    }

  return (
    <>
     {!token && <Navigate to="/" />}
      <form onSubmit={handleSubmit} className="d-flex align-items-center">
        <label className="form-label mb-0 mx-2">
          <input className="form-control" type="text" name="keyword" placeholder="Search..." />
        </label>
        <button className="btn btn-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
}

export default Buscador;
