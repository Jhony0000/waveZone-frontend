import React from "react";
import { Sginup as SginupComponents } from "../components/index";

function Sginup() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="text-primary mt-3 fw-bold text-center">waveZone</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <SginupComponents />
        </div>
      </div>
    </div>
  );
}

export default Sginup;
