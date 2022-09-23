import React from "react";
import {
  GithubOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

const Contacto = () => {
  return (
    <>
      <div className=" text-center p-5 vh bg-light bg-gradient">
        <h1 className="mb-4">Let's get in touch!</h1>
        <p className="p-2 mb-3">
          Either by <b className="text-success">email</b> or throught my <b className="text-success">social media</b>.
        </p>
        <h5 className="mt-3">Follow me:</h5>
        <a
          className="p-3 link-success"
          href="https://github.com/gerogarzon"
          target="_blank"
          rel="noreferrer"
        >
          <GithubOutlined style={{ fontSize: "25px" }} className="p-2" />
        </a>
        <a
          className="p-3 link-success"
          href="https://www.linkedin.com/in/geronimo-garzon/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinOutlined style={{ fontSize: "25px" }} className="p-2" />
        </a>
        <a
          className="p-3 link-success"
          href="https://www.facebook.com/geronimo.garzon"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookOutlined style={{ fontSize: "25px" }} className="p-2" />
        </a>
        <h5 className="mt-3">Email me:</h5>
        <i>gerogarzon@gmail.com</i>
      </div>
    </>
  );
};

export default Contacto;
