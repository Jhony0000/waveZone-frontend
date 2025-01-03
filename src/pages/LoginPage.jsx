import React from "react";
import { Login } from "../components/index";

function LoginPage() {
  return (
    <div className="container login-page mt-5">
      <div className="row mt-3">
        <div className="col-lg-4 col-md-4 text-center">
          <h1 className="text-primary mt-4 fw-bold ">waveZone</h1>
          <span className="mx-5  text-muted">
            Share your video for Human for
          </span>
          <h5 className="fw-bold text-muted mx-4">Justice for Palestine</h5>
        </div>
        <div className="col-lg-8 col-md-8">
          {" "}
          <Login />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
