import React from "react";
import authService from "../../appwrite/Auth";
import { logout } from "../../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function LogoutButton() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const logoutHandeler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      handleRefresh();
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!userData) {
    return <p></p>;
  }
  return (
    <button className="btn btn-danger" onClick={logoutHandeler}>
      Log out
    </button>
  );
}

export default LogoutButton;
