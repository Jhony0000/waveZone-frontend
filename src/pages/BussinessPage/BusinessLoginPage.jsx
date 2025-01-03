import React from "react";
import { BusinessUserLogin } from "../../bussinessComponents/index";

function BusinessLoginPage() {
  return (
    <div className="container login-page mt-5">
      <div className="row mt-3">
        <div className="col-lg-4 col-md-4 text-center">
          <h1 className="text-primary mt-4 fw-bold ">waveZone</h1>
          <span className="mx-5  text-muted">Create Your Own Business </span>
        </div>
        <div className="col-lg-8 col-md-8">
          <BusinessUserLogin />
        </div>
      </div>
    </div>
  );
}

export default BusinessLoginPage;
