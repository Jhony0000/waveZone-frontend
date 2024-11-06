import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MobilSideNav() {
  const auhtStutes = useSelector((state) => state.auth.status);
  const [uplodBtntnclassName, setUplodBtnClassName] = useState(
    "mobile-nav-uplod-btn bg-primary"
  );

  const navItems = [
    {
      url: "/",
      active: auhtStutes,
      icon: "ri-home-line",
    },
    {
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
      url: "/message",
      active: auhtStutes,
      icon: "ri-messenger-line",
    },
    {
      url: "/notification",
      active: auhtStutes,
      icon: "ri-notification-line",
    },
    {
      url: "/profail",
      active: auhtStutes,
      icon: "ri-user-line",
    },
  ];
  return (
    <div className="content ">
      <ul className="d-flex mobile-nav-content">
        {navItems.map((items) =>
          items.active ? (
            <li key={items.name} className="">
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
