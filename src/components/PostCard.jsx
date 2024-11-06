import React, { useEffect, useState } from "react";
import service from "../appwrite/Service";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostCard() {
  const [imgUrl, setImgUrl] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  // if (!userData) {
  //   return <div>Loading...</div>;
  // } else {
  // }
  return (
    <div className="container-fluid  post-cards">
      <div className="row">
        <div className="col-12">
          <div className="user-profail-section">
            <img
              className="user-profail-logo"
              src="\rendom-img.png"
              alt="logo"
            />
          </div>
          <div className="title mt-2">title</div>
          <div className="user-content mt-2">
            <img src="/photo.jpg" alt="content-img" />
          </div>
          <div className="post-info my-2  d-flex justify-content-around">
            <div className="like">0</div>
            <div className="share">0</div>
            <div className="views">0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
