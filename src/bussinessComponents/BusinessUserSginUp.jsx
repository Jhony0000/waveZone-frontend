import React from "react";
import { useState } from "react";
import { login } from "../store/bussiness.Authslice.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Button, Input } from "../components";
import { Link } from "react-router-dom";
import {
  registerUser,
  getCurrentUser,
} from "../backend/businessApi/user.api.js";

function BusinessUserSginUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const pageRefreshHandeler = () => {
    window.location.reload();
  };

  const create = async (data) => {
    setError("");
    try {
      console.log("data", data);
      const userData = await registerUser(data);
      console.log("register-userdata userData", userData);
      if (userData) {
        const data = await getCurrentUser();
        console.log("get currentuser", data);
        dispatch(login(data));
        console.log("login data", data);
        navigate("/business");
        pageRefreshHandeler();
      }
      // console.log("user regester successfull");
    } catch (error) {
      // console.log("user regester unSuccessFull");
      setError(error?.message || "Register faild");
    }
  };

  return (
    <div className="container-fluid sginup-container  mt-4">
      <div className="row">
        <div className="col-12 text-center">
          <h4 className="text-center mt-2 text-muted">
            Create a new business account
          </h4>
          <span className="text-muted">it's easy to create</span>
          <div className="sginup-underline"></div>
          {error && <p className="text-center text-danger">{error}</p>}
          <form onSubmit={handleSubmit(create)}>
            <Input
              className="mt-3 w-100"
              placeholder="business Name"
              {...register("businessName", {
                required: true,
              })}
            />

            <Input
              className="mt-3 w-100"
              placeholder="Emial"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              className="mt-3 w-100"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="btn mt-3 fw-bold btn-primary text-center w-50 mt-3 my-3"
              // onClick={handleRefresh}
            >
              Sgin up
            </Button>
            <div className="login-link text-center my-4">
              <Link to={`/business/login`}>
                Already have an business account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusinessUserSginUp;
