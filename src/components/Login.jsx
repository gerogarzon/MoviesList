// Libraries
import React from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";
import {useNavigate, Navigate} from "react-router-dom"
import '../css/bootstrap.min.css'


const Login = () => {

  // guardo en una variable el historial de navegacion (url) para una vez hecho el login redireccionarlo a otra page
  const currentPath = useNavigate();

  const submitHandler = (e) => {
    // prevengo que se refresque la pagina
    e.preventDefault();

    //  caputuro los valores de los campos: el e.target es quien dispara el evento y de ahi busco por el name a ese disparador (el name puesto en el input) y leo su valor con el metodo value
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Pongo una validacion para que no se envie un formulario con campos vacios
    if (email === "" || password === "") {
      swal(<h2>No pueden haber campos vacios</h2>);
      return;
    }
    
    // Pongo una validacion (una expresion regular en este caso) para que solo deje ingresar email con formatos validos
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Las expresiones regulares traen consigo metodos y funciones, en este caso la funcion test devuelve un booleano si cumple o no sus requisitos para que un email sea valido, aca me pregunto, no esta vacio ok pero me da false el test entonces avisale que introduzca un email valido
    if (email !== "" && !regexEmail.test(email)) {
      swal(<h2>Debes ingresar un email valido</h2>);
      return;
    }

    // Verifico autorizacion, que sea el email y la password que yo tengo autorizada a acceder
    if (email !== "challenge@alkemy.org" && password !== "react") {
      swal(<h2>Credenciales Invalidas</h2>);
      return;
    }
    
    // Si todaslas verificaciones se cumplen entonces manda a la API el usuario y guardo el token que me devuelve la response
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swal(<h2>Login success!</h2>);
        const tokenRecibido = res.data.token
        // Guardo el token en la sessionStorage, que a diferencia de la localStorage se borra automaticamente al cerrar el navegador o la pestaña
        sessionStorage.setItem("token", tokenRecibido)
        // redirecciono a la page listado con el hook useNavigate el cual cambia el path 
        currentPath("/listado");
        
      });
  };

  const token = sessionStorage.getItem("token");

  return (
    <>
    {token && <Navigate to="/listado" />}
    <div className="container my-4 ">
      <h2>Formulario de login</h2>
      <form onSubmit={submitHandler}>
        <label>
          <span>Correo electronico:</span>
          <br />
          <input type="text" name="email" />
        </label>
        <br />
        <label>
          <span>Contraseña:</span>
          <br />
          <input type="password" name="password" />
        </label>
        <br />
        <br />
        <button className="btn btn-success" type="submit">Ingresar</button>
      </form>
      </div>
    </>
  );
};

export default Login;
