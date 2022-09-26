import React from "react";

const Logout = () => {

    const handleLogout = ()=>{
        sessionStorage.clear();
        window.location.reload();
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
