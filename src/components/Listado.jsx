import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Header from "./Header"


const Listado = (props) => {

  
  // leo de las props los ids y los grabo en un array para luego compararlos con el id de la pelicula a la que se le hizo click en el btn favs para asi renderizarle un corazon rojo en vez de uno negro
  let idsInFavs = [];
  // como mis props son un array con objetos dentro y yo solo quiero extraer los ids de esos objetos debo iterarlo, uso un map que me devuelva solo los id (tener en cuenta que los id estan como string y no como number)
  idsInFavs = props.favoritos.map((movie) => {
    return movie.id;
  });

  // Importante inicializar mi estado con el tipo de info que yo espero recibir vacia porque sino da null y romperia el map dando error sin cargar nada
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=c4edc204321e6bf205d6e5f5ed8556cd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data.results;
        setMovieList(apiData);
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
  }, [setMovieList]);

  // console.log(movieList);

  const token = sessionStorage.getItem("token");
 

  return (
    <>
      {!token && <Navigate to="/" />}
    <Header favoritos={props.favoritos}/>
      <div className="container h-100">
        <h2 className="text-start m-3">Movie List:</h2>
        <div className="row">
          {movieList.map((item, index) => {
            return (
              <div key={index} className=" col-md-3 col-sm-6 col-xs-12 mt-3">
                <div className="card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    className="card-img-top"
                    alt={item.title}
                  />
                  {/* de las props leo la funcion escrita en el componente app que ejecuto al hacer click con el evento onclick */}
                  {/* recorro el array donde guarde todos los ids de las peliculas que estan en favoritos (tener en cuenta que comparo con 2= y no 3= porque comparo string con number) */}
                  {idsInFavs.find((movie) => {
                    return movie == item.id;
                  }) ? (
                    <button
                      className="favorite-movie"
                      onClick={props.addOrRemoveFromFavs}
                      data-movie-id={item.id}
                    >
                      ❤️
                    </button>
                  ) : (
                    <button
                      className="favorite-movie"
                      onClick={props.addOrRemoveFromFavs}
                      data-movie-id={item.id}
                    >
                      🖤
                    </button>
                  )}

                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    {/* Recorto la longitud de la descripcion para que me queden del mismo alto las cards con un metodo de array*/}
                    <p className="card-text">
                      {item.overview.substring(0, 100)}...
                    </p>
                    {/* Envio el id de esa pelicula mediante la url como una query con el simbolo ? para luego en el componente detalle leer ese id y hacer un get a la API para traer info mas detallada de esa movie */}
                    <Link
                      to={`/detalle?movieID=${item.id}`}
                      className="btn btn-success"
                    >
                      See more
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Listado;
