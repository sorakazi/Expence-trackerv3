import React from "react";
import { Triangle } from "react-loader-spinner"; // Correct import from react-loader-spinner

const LoaderSpinner = () => {
  return (
    <Triangle
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{ margin: "auto", display: "block" }}
      visible={true} // Make sure the spinner is visible
    />
  );
};

export default LoaderSpinner;
