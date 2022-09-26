import React from "react";
import { Link } from "react-router-dom";
import Buscador from "./Buscador";
import Logout from "./Logout";
import "../css/bootstrap.min.css";

const Header = ({ favoritos }) => {
  
  const token = sessionStorage.getItem("token");
 
  
  return (
    <nav className="navbar navbar-expand-lg bg-dark p-3">
      <div className="container-fluid">
        <div className="collapse navbar-collapse ">
          <ul className="navbar-nav ">
            {!token ? (
              <li className="nav-item ">
                <Link className="nav-link text-white" to="/">
                  Log in
                </Link>
              </li>
            ) : (
              <Logout />
            )}

            {token === null ? (
              <></>
            ) : (
              <>
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
                  {favoritos.length > 0 && (
                    <span className="text-success">{favoritos.length}</span>
                  )}
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contacto">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <Buscador />
      </div>
    </nav>
  );
};

export default Header;
