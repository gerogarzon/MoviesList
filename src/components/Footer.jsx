import React from "react";
import "../css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <footer className="container p-3 text-center ">
        <div className="row flex-column">
          <div className="col">
            <nav className="navbar justify-content-center">
              <ul className="navbar-nav flex-row">
                <li className="nav-item">
                  <a
                    className="nav-link text-end pe-4"
                    href="http://www.linkedin.com/in/geronimo-garzon/"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-end"
                    href="http://www.linkedin.com/in/geronimo-garzon/"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col">
            <p className="justify-content-center ">
              Copyright - Geronimo Garzon, Alkemy Challenge
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
