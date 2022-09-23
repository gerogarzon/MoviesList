import React from "react";
import { Link } from "react-router-dom";
import Buscador from "./Buscador";
import "../css/bootstrap.min.css";

const Header = ({favoritos}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark p-3">
      <div className="container-fluid">
        <div className="collapse navbar-collapse ">
          <ul className="navbar-nav ">
            <li className="nav-item ">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/listado">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/favoritos">
                Favorites
              </Link>
            </li>
            <li className="nav-item">
             {favoritos.length > 0 && <span className="text-success">{favoritos.length}</span>}
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contacto">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <Buscador className="" />
      </div>
    </nav>
  );
};

export default Header;
