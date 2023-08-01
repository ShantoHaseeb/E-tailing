import React from "react";
import { Spinner } from "react-bootstrap";

function Load() {
  return (
    <div
      className='load-container'
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner animation='grow' />
    </div>
  );
}

export default Load;
