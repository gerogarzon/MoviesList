import React from 'react'
import { Link, Navigate } from "react-router-dom";

const Favoritos = ({favoritos}) => {

    const token = sessionStorage.getItem("token");
   
    // esta logica de guardar en un estado los favoritos me sirve mas en la app para que pueda ser pasado a los componentes hijos como props la dejo comentada y la llevo a la app
                    // const [favoritos , setFavoritos] = useState([]);
                    // useEffect(() =>{
                    //     const favsInLocal = JSON.parse(localStorage.getItem("favs"))
                    //     setFavoritos(favsInLocal)    
                    //     console.log(favsInLocal);
                    // },[])

  return (
    <>
     {!token && <Navigate to="/" />}
    <div className="container h-100">
        <h2 className="text-start m-3">My favorites movies:</h2>
     {favoritos.length === 0 && <h5 className="text-danger p-3"><em>No favorites added</em></h5>}
        <div className="row">
          {favoritos.map((item, index) => {
            return (
              <div key={index} className="col-3 mt-3">
                <div className="card">
                  <img src={item.imgURL} className="card-img-top" alt={item.title} />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    {/* Recorto la longitud de la descripcion para que me queden del mismo alto las cards con un metodo de array*/}
                    <p className="card-text">{item.overview.substring(0,100)}...</p>
                    {/* Envio el id de esa pelicula mediante la url como una query con el simbolo ? para luego en el componente detalle leer ese id y hacer un get a la API para traer info mas detallada de esa movie */}
                    <Link to={`/detalle?movieID=${item.id}`} className="btn btn-success">
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
  )
}

export default Favoritos