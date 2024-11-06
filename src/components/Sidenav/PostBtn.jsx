import React from "react";
import { Link } from "react-router-dom";

function PostBtn() {
  return (
    <div>
      <Link to="/post">
        <button className="btn btn-primary w-50 fw-bold mt-4">Post</button>
      </Link>
    </div>
  );
}

export default PostBtn;
