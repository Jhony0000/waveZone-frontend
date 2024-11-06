import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function Sidenav() {
  const [isopen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [routerHover, setRouteHover] = useState(false);
  const [routeHoverClass, setRouterHoverCless] = useState(
    "homePage-route-hover"
  );
  const auhtStutes = useSelector((state) => state.auth.status);

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
      url: "/profail",
      active: auhtStutes,
      icon: "ri-user-line",
    },
    // {
    //   name: "Uplod",
    //   url: "/uplod",
    //   active: auhtStutes,
    //   icon: "ri-video-upload-line",
    // },
  ];

  function uplodVideoPostToggle() {
    setIsOpen(!isopen);
  }

  return (
    <div className="side-nav ">
      <div className=" components">
        {/* don't remove this h5 */}

        <div className=" border-nav pt-5">
          <h5 className="fw-bold logo1 ">WaveZone</h5>
          <ul className="pt-4">
            {navItems.map((items) =>
              items.active ? (
                <li key={items.name}>
                  <NavLink className="" to={items.url}>
                    <div
                      className={`side-nav-icon-btn  mt-3 d-flex `}
                      onClick={() => routerToggle()}
                    >
                      <i className={`${items.icon} px-3 `}></i>{" "}
                      <button className="button-list">{items.name}</button>
                    </div>
                  </NavLink>
                </li>
              ) : null
            )}
            <div
              className="uplod-post-section side-nav-icon-btn"
              onClick={uplodVideoPostToggle}
            >
              <i className="ri-video-upload-line  uplod-post-section-i"></i>
              <button className="button-list px-3">Uplod</button>
              <div
                className={`uplod-post-section-content ${
                  isopen ? "d-block" : ""
                }`}
              >
                <Link className="d-flex side-nav-icon-btn" to="">
                  <i class="ri-video-line"></i>
                  <button className="uplod-video-btn px-3">Uplod video</button>
                </Link>
                <Link className="d-flex side-nav-icon-btn" to="">
                  <i class="ri-draft-line"></i>
                  <button className="uplod-video-btn px-3">Create blog</button>
                </Link>
                <Link className="d-flex side-nav-icon-btn" to="">
                  <i class="ri-edit-box-line"></i>
                  <button className="uplod-video-btn px-3">Create post</button>
                </Link>
              </div>
            </div>
            <div className="setting side-nav-icon-btn d-flex">
              <i class="ri-menu-line"></i>
              <button className="button-list px-3">More</button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
