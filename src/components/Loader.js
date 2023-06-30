import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <ClipLoader
        color={"grey"}
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
