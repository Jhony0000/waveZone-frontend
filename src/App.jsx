import Sidenav from "./components/Sidenav/Sidenav";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./backend/userApi/apiService";
import MobilSideNav from "./components/Sidenav/mobilSideNav";

function App() {
  const [loding, setLoding] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  // useEffect(() => {
  //   authService
  //     .getCurrentUser()
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(login({ userData }));
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     .finally(() => setLoding(false));
  //   console.log("loding finished");
  // }, []);
  useEffect(() => {
    getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return userData ? (
    <>
      <main className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 d-none d-md-block col-md-4  d-flex justify-content-center sideNav">
              {" "}
              <Sidenav />
            </div>
            <div className="col-lg-8 mr-5 pt-3 px-5 col-md-8 col-12 app-outlet-coponents">
              <Outlet />
            </div>
          </div>
          <div className="row d-flex MobilSideNav d-md-none mt-">
            <div className="col-12">
              <MobilSideNav />
            </div>
          </div>
        </div>
      </main>
    </>
  ) : (
    <div>
      <main className="pt-5">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
