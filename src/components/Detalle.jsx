import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import Header from "./Header"

const Detalle = ({favoritos}) => {

  // Leo de la URl la query que trae cosigo para sacar de ahi el id, para eso uso el objeto URLSearchParams y el objeto window.location que me trae la url y uso el metodo search para leer su query (lee todo lo que hay despues del ? en la url) y la guardo en una variable
  let query = new URLSearchParams(window.location.search);
  // para leer solo el id uso el metodo get del objeto URLSearchParams y busco por el nombre de la query
  let id = query.get("movieID");

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    let endPoint = `https://api.themoviedb.org/3/movie/${id}?api_key=c4edc204321e6bf205d6e5f5ed8556cd&language=en-US`;

    axios
      .get(endPoint)
      .then((response) => {
        // console.log("here", response.data);
        setMovie([response.data]);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, we are working on it...',
          showConfirmButton: false,
          timer: 1500
        })
      });
  }, [id]);

  // Leo el token de la sessionStorage para restringirle el acceso a esta ruta si es que no esta registrado
  const token = sessionStorage.getItem("token");

  return (
    <>
      {!token && <Navigate to="/" />}
      <Header favoritos={favoritos}/>
      <div className="container-fluid bg-dark">
        {movie.map((item, index) => {
          return (
            <div className="row p-4" key={index}>
              <h2 className="p-2 text-start ms-5 text-white mb-3">
                Title: {item.title}
              </h2>
              <div className="col-5 bg-dark">
                <img
                  className="img-fluid img-thumbnail"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt="imagen"
                />
              </div>
              <div className="col-7  bg-dark text-white">
                <div className="container">
                  <div>
                    <h4>Description:</h4>
                    <p className="m-0">{item.overview}</p>
                  </div>
                  <div>
                    <h4> Main genre:</h4>
                    <span>{item.genres[0].name}</span>
                  </div>
                  <div>
                    <h4>Release date:</h4>
                    <span>{item.release_date}</span>
                  </div>
                  <div>
                    <h4>Spoken languages:</h4>
                    <span>{item.spoken_languages[0].name}</span>
                  </div>
                  <div>
                    <h4>Website:</h4>
                    <span>{item.homepage}</span>
                  </div>
                </div>
                <div>
                  <Link className="btn btn-success mt-3 ms-2 text-white" to="/">
                    Go back
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Detalle;
