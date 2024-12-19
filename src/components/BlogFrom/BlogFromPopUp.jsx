import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import BlogPhotoPopUp from "./BlogPhotoPopUp";

function BlogFromPopUp({ onClose }) {
  const [blogTitel, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isOpenBlogPhotoPopUp, setIsOpenBlogPhotoPopUp] = useState(false);
  const [error, setError] = useState("");
  const [errorHandeler, setErrorHandeler] = useState(false);

  const openBlogPhotoFrom = () => {
    if (!errorHandeler) {
      setIsOpenBlogPhotoPopUp(true);
    } else {
      ErrroHandeler();
    }
  };
  const ErrroHandeler = () => {
    setErrorHandeler(true);
  };
  const closeBlogFrom = () => {
    setIsOpenBlogPhotoPopUp(false);
  };
  const getTitel = (title) => {
    if (title.length > 200) {
      setError("Title must be under 200 character");
      setIsOpenBlogPhotoPopUp(false);
    } else {
      setBlogTitle(title);
    }
  };
  const getContent = (content) => {
    if (content.length > 500) {
      setError("Content must be under 500 character");
      setIsOpenBlogPhotoPopUp(false);
    } else {
      setBlogContent(content);
    }
  };

  return ReactDOM.createPortal(
    <div className="pop-up-blog-from">
      <div className="blog-from-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12  nav d-flex justify-content-between">
              <div className="div">
                <h6 className="text-start py-2">Uplod Blog</h6>
              </div>
              <div className="close-icon">
                <i className="ri-close-large-fill" onClick={onClose}></i>
              </div>
            </div>
          </div>

          <form>
            <div className="row mt-4">
              <div className="col-12 blog-title">
                {errorHandeler && (
                  <p className="text-danger text-center">{error}</p>
                )}
                <input
                  required
                  type="text"
                  className="w-100"
                  placeholder="Blog title..."
                  onChange={(e) => getTitel(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 blog-content">
                <textarea
                  maxLength={500}
                  required
                  name=""
                  id=""
                  placeholder="Content..."
                  onChange={(e) => getContent(e.target.value)}
                ></textarea>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-12">
              <button
                className="btnn mt-3 btn btn-light"
                onClick={openBlogPhotoFrom}
              >
                Next
              </button>
            </div>
          </div>
          {isOpenBlogPhotoPopUp && (
            <BlogPhotoPopUp
              onClose={closeBlogFrom}
              blogTitle={blogTitel}
              blogContent={blogContent}
              parantClose={onClose}
            />
          )}
        </div>
        <div className="warning-message-for-user d-flex">
          <i className="ri-file-warning-line"></i>
          <p className="text-start">
            Your content must be authorise and legal . don't write any harmful
            content for people . don't violet any rules in this app .{" "}
            <Link>See more</Link>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default BlogFromPopUp;
