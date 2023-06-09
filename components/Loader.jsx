//import React from 'react'
import LoaderImg from "../assets/loader.gif";
//import { ReactDOM } from 'react-dom'
import ReactDOM  from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="fixed w-screen h-screen z-10 wrapper">
      <div className="fixed top-1/2 left-1/2 z-50 loader">
        <img src={LoaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default Loader;
