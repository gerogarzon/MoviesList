// Libraries
import {Routes, Route} from 'react-router-dom'
import React , {useEffect, useState }from 'react'

// Componentes
import Login from "./components/Login"
import Listado from "./components/Listado"
import Detalle from "./components/Detalle"
import Contacto from "./components/Contacto"
import Resultados from './components/Resultados'
import Favoritos from './components/Favoritos'
import Header from './components/Header'
import Footer from './components/Footer'

// Styles
import './css/bootstrap.min.css'
import "./css/app.css"



function App(props) {

  const [favoritos , setFavoritos] = useState([]);

  useEffect(() =>{
      const favsInLocal = JSON.parse(localStorage.getItem("favs"))
      setFavoritos(favsInLocal)    
  },[])



  const addOrRemoveFromFavs = (e)=> {
    // voy a guardar en la localstorage las pelicular que clickeo como favoritas para ello usare una variable intermedia que inicalizare vacia y pondre una verificacion que si mi local storage esta null setee esta variable intermedia con un array vacio
    let favMovies = localStorage.getItem('favs');
  
  
    let tempMoviesInFavs;
  
    if (favMovies === null){
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }
    
    // capturo el elemento que disparo el evento e y lo guardo en una variable que llamo btn porque yo se que es el button es quien dispara el evento
  const btn = e.currentTarget;
  // ahora capturo el elemento padre de ese elemento button que esta en el componente listado usando una funcion integrada en js para de el sacar la info que necesito que es la url de la imagen el texto y el overview (info que necesito para renderizar la card )
  const parent = btn.parentElement;
  // ahora busco dentro de ese componente padre el componente img y con un metodo leo su atributo src para leer la url de esa imagen que es lo que busco
  const imgURL = parent.querySelector('img').getAttribute('src');
  // ahora el titulo que esta en un h5 y con el innerText leo la data dentro
  const title = parent.querySelector('h5').innerText;
  // idem para el overview que esta en un p
  const overview = parent.querySelector('p').innerText;
  // ahora guardo en un objeto toda esta info para luego usarla, tambien me falta saber el id de esa movie que en este caso no obtengo de la url seria complejo extraerla de ahi sino que en el componente listado grabare en el btn de favorito un atributo data (estos atributos tienen metodos integrados para luego extraer la info alli dentro)(tener en cuenta que en el componente listado en el atributo data yo lo llame data-id pero este me trajo la info como movieId, siempre hacer log al dataset para ver como trae la info)
  const movieData = {
    imgURL,
    title,
    overview,
    id: btn.dataset.movieId,
  }
 
  // como no quiero que una misma pelicula faveada se guarde mas de una ves hago un find (el filter no porque me devuelve todos los elemento que coincidan y el find solo uno)
  // el find lo que dice es devolveme aquella movie dentro del array tempMoviesInFavs cuyo id coincida con el id de la pelicula que quiero guardar (del objeto movieData)
  let alreadyInArray = tempMoviesInFavs.find(movie => {
    return movie.id === movieData.id
  })
  // ahora lo que hago con esa variable alreadyInArray es poner un if para no volver a guardarla en la localstorage y con el else hago que se elimine si vuelvo a tocar
  if(!alreadyInArray){
    // guardo este objeto construido dentro del array temporario creado
    tempMoviesInFavs.push(movieData);
    // guardo este array temporario en la local storage
    localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
    // ademas de guardarla en la local storage la seteo en el estado
    setFavoritos(tempMoviesInFavs);
    console.log("se agrego");
  } else {
    // esta logica dice devolveme todos los que no tengan ese id y guardalos en la variable moviesLeftInFavs y asi elimino ese id dejandolo fuera de la variable moviesLeft que uso para setear la local y el estado
    let moviesLeftInFavs = tempMoviesInFavs.filter(movie=>{
      return movie.id !== movieData.id 
    })
    localStorage.setItem('favs', JSON.stringify(moviesLeftInFavs));
    setFavoritos(moviesLeftInFavs);
    console.log("se elimino");
  }

  
 }
  return (
    <>
    <Header favoritos={favoritos} />
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/listado" element={<Listado favoritos={favoritos} addOrRemoveFromFavs={addOrRemoveFromFavs}/>}/>
      <Route path="/detalle" element={<Detalle/>}/>
      <Route path="/contacto" element={<Contacto/>}/>
      <Route path="/resultados" element={<Resultados/>}/>
      <Route path="/favoritos" element={<Favoritos favoritos={favoritos}/>}/>
    </Routes> 
    <Footer/>
    </>
  );
}

export default App;
