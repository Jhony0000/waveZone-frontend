import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MobilSideNav() {
  const auhtStutes = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [uplodBtntnclassName, setUplodBtnClassName] = useState(
    "mobile-nav-uplod-btn bg-primary"
  );

  const navItems = [
    {
      name: "Home",
      url: "/",
      active: auhtStutes,
      icon: "ri-home-line",
    },
    {
      name: "explore",
      url: "/explor",
      active: auhtStutes,
      icon: "ri-search-line",
    },
    {
      name: "Uplod",
      url: "/uplod",
      active: auhtStutes,
      icon: "ri-add-line",
    },
    {
      name: "Message",
      url: "/message",
      active: auhtStutes,
      icon: "ri-messenger-line",
    },
    {
      name: "Notification",
      url: "/notification",
      active: auhtStutes,
      icon: "ri-notification-line",
    },
    {
      name: "Profail",
      url: `/profail/${userData.data._id}`,
      active: auhtStutes,
      icon: "ri-user-line",
    },
  ];
  return (
    <div className="content ">
      <ul className="d-flex mobile-nav-content">
        {navItems.map((items) =>
          items.active ? (
            <li key={items.name}>
              <Link className="" to={items.url}>
                <div className=" mt-3">
                  <i
                    className={`${items.icon} ${
                      items.name === "Uplod" ? uplodBtntnclassName : ""
                    }`}
                  ></i>{" "}
                </div>
              </Link>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default MobilSideNav;
