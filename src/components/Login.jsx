// Libraries
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "./Header";
import "../css/bootstrap.min.css";

const Login = ({ favoritos }) => {
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No entries found",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Pongo una validacion (una expresion regular en este caso) para que solo deje ingresar email con formatos validos
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Las expresiones regulares traen consigo metodos y funciones, en este caso la funcion test devuelve un booleano si cumple o no sus requisitos para que un email sea valido, aca me pregunto, no esta vacio ok pero me da false el test entonces avisale que introduzca un email valido
    if (email !== "" && !regexEmail.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must enter a valid email address",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Verifico autorizacion, que sea el email y la password que yo tengo autorizada a acceder
    if (email !== "challenge@alkemy.org" && password !== "react") {
      console.log("entro");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid credentials",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const fakeToken = "hdhdgvdgchdgddg";
    sessionStorage.setItem("token", fakeToken);
    currentPath("/listado");

    // Si todaslas verificaciones se cumplen entonces manda a la API el usuario y guardo el token que me devuelve la response
    // axios
    //   .post("http://challenge-react.alkemy.org", { email, password })
    //   .then((res) => {
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'You logged in successfully',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     const tokenRecibido = res.data.token
    //     // Guardo el token en la sessionStorage, que a diferencia de la localStorage se borra automaticamente al cerrar el navegador o la pestaña

    //     sessionStorage.setItem("token", tokenRecibido)
    //     // redirecciono a la page listado con el hook useNavigate el cual cambia el path
    //     currentPath("/listado");

    //   });
  };

  const token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to="/listado" />}
      <Header favoritos={favoritos} />
      <div className="d-flex justify-content-center my-3 ">
        <div className="row text-light bg-success rounded p-5 w-50">
          <div className="p-0 ms-3">
            <h1>
              <em>Login</em>
            </h1>
            <h6 className="text-dark p-0 m-0 mb-2">
              {" "}
              You can try this website using the following credentials:
            </h6>
            <h6 className="text-dark p-0 m-0">
              <em>Email: challenge@alkemy.org</em>
            </h6>
            <h6 className="text-dark p-0 mb-3">
              <em>Password: react</em>
            </h6>
          </div>

          <form onSubmit={submitHandler}>
            <label>
              <span>Email:</span>
              <br />
              <input type="text" name="email" />
            </label>
            <br />
            <label>
              <span>Password:</span>
              <br />
              <input type="password" name="password" />
            </label>
            <br />
            <br />
            <button className="btn btn-light" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
