import React from "react";
import { NavLink } from "react-router-dom";

function PostNav() {
  const postNavItems = [
    {
      name: "Video",
      url: "/",
    },
    {
      name: "Blog",
      url: "/blog",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <ul className="post-nav">
            {postNavItems.map((items) => (
              <li key={items.name}>
                <NavLink
                  to={items.url}
                  className={({ isActive }) =>
                    isActive ? "post-nav-link active" : "post-nav-link"
                  }
                >
                  <button className="post-nav-btn">{items.name}</button>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PostNav;
