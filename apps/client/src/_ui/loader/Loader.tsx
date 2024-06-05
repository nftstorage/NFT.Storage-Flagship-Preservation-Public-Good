import React from "react";
import styling from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styling.spinnerContainer}>
      <div className={styling.spinner}></div>
    </div>
  );
};

export default Loader;
