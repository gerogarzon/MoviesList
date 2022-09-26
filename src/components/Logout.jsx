import React from "react";
import {useNavigate} from "react-router-dom";


const Logout = () => {

    const currentPath = useNavigate();
    const handleLogout = ()=>{
        sessionStorage.clear();
        currentPath("/");
    }

  return (
    <>
      <li className="nav-item d-flex align-items-center ">
        <button className="btn btn-dark p-0 " onClick={handleLogout}>
          Log out
        </button>
      </li>
    </>
  );
};

export default Logout;
