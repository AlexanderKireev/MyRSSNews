import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Spinner = ({ cn, size }) => {
  return (
    <div className={cn}>
      <RotatingLines
        animationDuration="2"
        ariaLabel="loading"
        height={size}
        // radius="1"
        strokeColor="grey"
        strokeWidth="4"
        width={size}
      />
    </div>
  );
};

export default Spinner;
