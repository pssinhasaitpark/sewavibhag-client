import React from "react";
import { PropagateLoader } from "react-spinners";

const Loader = ({ loading, error }) => {
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center">
        <PropagateLoader color="#ff6600" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-danger mt-4">
        <p>Error: {error?.message}</p>
      </div>
    );

  return null;
};

export default Loader;
