import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";
import { Link} from "react-router-dom";

const Resultados = () => {
  
  // Leo de la URl la query que trae cosigo para sacar de ahi el id, para eso uso el objeto URLSearchParams y el objeto window.location que me trae la url y uso el metodo search para leer su query (lee todo lo que hay despues del ? en la url) y la guardo en una variable
  let query = new URLSearchParams(window.location.search);
  // para leer solo el id uso el metodo get del objeto URLSearchParams y busco por el nombre de la query
  let keyword = query.get("keyword");
  
  const [moviesResults, setMoviesResult] = useState([]);
  // console.log("kk",moviesResults);
  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=c4edc204321e6bf205d6e5f5ed8556cd&language=en-US&query=${keyword}`;
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data.results;
        console.log('ll',apiData);
        if (apiData.length === 0) {
          swal(<h2>We couldn't find any results</h2>);
          return
        }
        setMoviesResult(apiData);
      })
      .catch((error) =>  console.log("caca",error) );   
},[moviesResults]);

  // console.log("kk2",moviesResults);

  return (
    <div className="container h-100"> 
      <h2 className="text-start m-3"> Search: <em>{keyword}</em> </h2>

      {moviesResults.length === 0 && <h3>No results</h3>}

      <div className="row">
        {moviesResults.map((item, index) => {
          return (
            <div key={index} className="col-3 mt-3">
              <div className="card ">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  className="card-img-top"
                  alt={item.title}
                />
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
  );
};

export default Resultados;