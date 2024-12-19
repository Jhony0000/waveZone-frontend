import React from "react";
import BlogCard from "../components/BlogFrom/BlogCard";
import PostNav from "../components/PostNav";
function BlogPage() {
  return (
    <div className="container-fluid">
      <div className="row d-flex jutify-content-center">
        <div className="col-lg-12 col-12">
          <PostNav />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-12 col-12">
          <BlogCard />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
