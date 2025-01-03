// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login, logout } from "./store/bussiness.Authslice";
// import { getCurrentUser } from "./backend/businessApi/user.api";
// import { Outlet } from "react-router";

// function BusinessApp() {
//   const dispatch = useDispatch();
//   const businessUserData = useSelector((state) => state.auth.businessUserData);

//   useEffect(() => {
//     getCurrentUser().then((userData) => {
//       if (userData) {
//         dispatch(login({ userData }));
//       } else {
//         dispatch(logout());
//       }
//     });
//   }, []);
//   console.log("bussiness userdata", businessUserData);

//   return businessUserData ? (
//  //*   <div>
//       welcome to business app
//       <Outlet />
//     </div>
//   ) : (
//     <div>
//       {" "}
//       <Outlet />
//     </div>
//   );
// }

// export default BusinessApp;
