import React from "react";
import Swal from 'sweetalert2'
import {useNavigate, } from "react-router-dom"

function Buscador() {


    const currentPath = useNavigate();

    const handleSubmit = (e)=>{

        e.preventDefault();

        // el metodo trim elimina espacios vacios adelante y detras de una oracion9no elimina los del medio) asi estoy poniendo una validacion por si me introducen la palabra con un espacio antes o despues
        const key = e.target.keyword.value.trim();
        // console.log(key);

        // aca le digo que minimo ponga cuatro letras para poder buscar sino le aviso del error 
        if (key.length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Empty search',
            showConfirmButton: false,
            timer: 1500
          })
        } else if (key.length < 4){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must enter at least 4 characters',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
            e.target.keyword.value = "";
            currentPath(`/resultados?keyword=${key}`);
        }

    }

  return (
    <>
     
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
