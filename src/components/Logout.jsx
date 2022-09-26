import React from "react";

const Logout = () => {

    const handleLogout = ()=>{
        sessionStorage.clear();
        window.location.reload();
    }

  return (
    <>
      <li className="nav-item ">
        <button className="btn btn-dark" onClick={handleLogout}>
          Log out
        </button>
      </li>
    </>
  );
};

export default Logout;
