import React, { useState, useEffect } from "react";
import ReactDoM from "react-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import VideoUploadPopup from "../videoUplodPopUp";
import LogoutButton from "./LogoutButton";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../backend/userApi/apiService";
import { logout } from "../../store/AuthSlice";
import BlogFromPopUp from "../BlogFrom/BlogFromPopUp";
import {
  getUserNotification,
  nonReadNotification,
  readNotification,
} from "../../backend/notification/notificationApi";

function Sidenav() {
  const [isopen, setIsOpen] = useState(false);
  const [isMoreBtnToggoleOpen, setIsMoreBtnToggoleOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [routerHover, setRouteHover] = useState(false);
  const [isBlogFromOpen, setIsBlogFromOpen] = useState(false);
  const dispatch = useDispatch();
  const [notificationLength, setNotificationLenth] = useState(null);
  const auhtStutes = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  console.log("length", notificationLength);
  console.log("side nav", userData.data._id);
  const BlogFromOPen = () => {
    setIsBlogFromOpen(true);
  };

  const BlogFromClose = () => {
    setIsBlogFromOpen(false);
  };
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUpload = (file) => {
    // console.log("Uploaded video file:", file);
  };

  const routerToggle = () => {
    setRouteHover(true);
  };

  const navItems = [
    {
      name: "Home",
      url: "/",
      active: auhtStutes,
      icon: "ri-home-4-line",
    },
    {
      name: "Explore",
      url: "/explor",
      active: auhtStutes,
      icon: "ri-search-line",
    },
    {
      name: "Notification",
      url: "/notification",
      active: auhtStutes,
      icon: "ri-notification-line",
    },
    {
      name: "Message",
      url: "/message",
      active: auhtStutes,
      icon: "ri-messenger-line",
    },
    {
      name: "Profail",
      url: `/profail/${userData.data._id}`,
      active: auhtStutes,
      icon: "ri-user-line",
    },
  ];

  function uplodVideoPostToggle() {
    setIsOpen(!isopen);
  }

  function moreBtnToggel() {
    setIsMoreBtnToggoleOpen(!isMoreBtnToggoleOpen);
  }

  const logoutHandeler = () => {
    logOutUser().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logout());
      pageRefreshHandeler();
    });
  };
  console.log("notification count length", notificationLength);
  useEffect(() => {
    const notificationsCount = async () => {
      try {
        const notifications = await nonReadNotification(userData.data?._id);
        console.log(notifications);
        setNotificationLenth(
          notifications.data.data > 0 ? notifications.data.data : null
        );
      } catch (error) {
        console.error("notification coung erorr notifications:", error);
      }
    };
    if (userData.data._id) {
      notificationsCount();
    }
  }, [userData.data._id]);

  const readNotifications = async () => {
    try {
      await readNotification(userData.data._id);
      // setNotificationLenth(notifications.data.data.length);
    } catch (error) {
      console.error("read notifications:", error);
    }
  };

  return (
    <div className="side-nav ">
      <div className=" components">
        {/* don't remove this h5 */}
        {isPopupOpen && (
          <VideoUploadPopup onClose={closePopup} onUpload={handleUpload} />
        )}
        {isBlogFromOpen && <BlogFromPopUp onClose={BlogFromClose} />}
        <div className=" border-nav pt-5">
          <h5 className="fw-bold logo1 d-md-none d-lg-block">WaveZone</h5>
          <ul className="pt-4">
            {navItems.map((items) =>
              items.active ? (
                <li key={items.name}>
                  <NavLink
                    className=""
                    to={items.url}
                    onClick={() => {
                      if (items.url === "/notification") readNotifications();
                    }}
                  >
                    <div
                      className={`side-nav-icon-btn  mt-3 d-flex `}
                      onClick={() => routerToggle()}
                    >
                      <i className={`${items.icon} px-3 `}>
                        {items.icon === "ri-notification-line" ? (
                          <span className="text-danger fw-bold notification-count">
                            {notificationLength}
                          </span>
                        ) : (
                          ""
                        )}
                      </i>{" "}
                      <button className="button-list text-start d-md-none d-lg-block">
                        {items.name}
                      </button>
                    </div>
                  </NavLink>
                </li>
              ) : null
            )}
            <div
              className="uplod-post-section side-nav-icon-btn d-flex"
              onClick={uplodVideoPostToggle}
            >
              <i className="ri-video-upload-line  uplod-post-section-i"></i>
              <button className="uplod-btn-sideNav  d-md-none d-lg-block">
                Uplod
              </button>
              <div
                className={`uplod-post-section-content mt-5 ${
                  isopen ? "d-block" : ""
                }`}
              >
                {" "}
                <Link className="d-flex side-nav-icon-btn" onClick={openPopup}>
                  <i className="ri-video-line"></i>
                  <button className="uplod-video-btn fw-bold px-3">
                    Uplod video
                  </button>
                </Link>
                <Link
                  className="d-flex side-nav-icon-btn"
                  to=""
                  onClick={BlogFromOPen}
                >
                  <i className="ri-draft-line"></i>
                  <button className="uplod-video-btn fw-bold px-3">
                    Create blog
                  </button>
                </Link>
              </div>
            </div>
            <div
              className="more-btn-section side-nav-icon-btn d-flex"
              onClick={moreBtnToggel}
            >
              <i className="ri-menu-line more-icon"></i>
              <button className="button-list more-btn px-3 pt-1 text-start d-md-none d-lg-block">
                More
              </button>
              <div
                className={`more-toggole-open mt-5 ${
                  isMoreBtnToggoleOpen ? "d-block" : ""
                }`}
              >
                {" "}
                <Link className="d-flex side-nav-icon-btn  mt-1">
                  <i className="ri-profile-fill "></i>
                  <button className="add-existing-account fw-bold ">
                    Add an existing account
                  </button>
                </Link>
                <Link
                  className="d-flex side-nav-icon-btn my-2 mt-1 "
                  onClick={logoutHandeler}
                >
                  <i className="ri-logout-box-line logout-btn-icon"></i>
                  <button className="log-out-btn   fw-bold">Log out</button>
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
