import React, { useState } from "react";
import authService from "../appwrite/Auth";
import { login as authLogin } from "../store/AuthSlice";
import { loginUser, getCurrentUser } from "../backend/userApi/apiService";
import { useDispatch } from "react-redux";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const LoginAccount = async (data) => {
  //   setError("");
  //   try {
  //     const loginData = await authService.login(data);
  //     if (loginData) {
  //       const data = await authService.getCurrentUser();
  //       if (data) {
  //         dispatch(authLogin(data));
  //         navigate("/");
  //       }
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  const pageRefreshHandeler = () => {
    window.location.reload();
  };

  const LoginAccount = async (data) => {
    try {
      // console.log("loginpage data", data);
      const userData = await loginUser(data);
      console.log("login successfull in login page");
      if (userData) {
        // console.log("userData", userData);
        const data = await getCurrentUser();
        // console.log("data", data);
        dispatch(authLogin(data));
        navigate("/");
        pageRefreshHandeler();
        // console.log("success login");
      }
      // console.log("login successfully");
    } catch (error) {
      setError(error?.message || "Login faild");
    }
  };
  return (
    <>
      <div className="container-fluid login-container mt-5">
        <div className="row">
          <div className="col-12">
            {error && <p className="text-center pt-4 text-danger">{error}</p>}
            <form onSubmit={handleSubmit(LoginAccount)}>
              <Input
                className="mt-2 w-100 "
                placeholder="Emial"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                className="mt-3 w-100 "
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button
                type="submit"
                className="w-100 btn fw-bold btn-primary mt-4 my-3 d-flex justify-content-center"
                // onClick={handleRefresh}
              >
                Log in
              </Button>
              <div className="div text-center forgotten-password">
                <a href="#">Forgotten password?</a>
              </div>
              <div className="login-page-underline"></div>
              <Link to="/sginup" className="mx-5">
                <button className="btn btn-primary w-50 text-light my-4 mx-5 create-account-btn">
                  Create new account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
