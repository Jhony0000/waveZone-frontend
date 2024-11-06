import React from "react";
import { NavLink } from "react-router-dom";

function PostNav() {
  const postNavItems = [
    {
      name: "Video",
      url: "/",
    },
    {
      name: "Post",
      url: "/post",
    },
    {
      name: "Blog",
      url: "/blog",
    },
  ];
  return (
    <div className="d-flex post-nav justify-content-between border">
      {postNavItems.map((items) => (
        <li key={items.name} className="d-flex ">
          <NavLink to={items.url} className="post-nav-link">
            <div className="post-nav-icon">
              <span className="post-nav-btn">{items.name}</span>
            </div>
          </NavLink>
        </li>
      ))}
    </div>
  );
}

export default PostNav;
