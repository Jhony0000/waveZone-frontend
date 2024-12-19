import React from "react";
import PostNav from "../components/PostNav";
import { VideoCard } from "../components";
function PostPage() {
  return (
    <div className="container-fluid">
      <div className="row d-flex jutify-content-center">
        <div className="col-lg-12 col-12">
          <PostNav />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-12 col-12">
          <VideoCard />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
