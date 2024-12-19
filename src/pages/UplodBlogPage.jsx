import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserBlog } from "../backend/blogApi/blogApi";
import BlogDelete from "../components/popupComponents/BlogDelete";
import BlogEdite from "../components/popupComponents/BlogEdite";
import { searchUserBlog } from "../backend/blogApi/blogApi";
import debounce from "lodash.debounce";
import CommentPopup from "../components/popupComponents/CommentPopup";
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";

function UplodBlogPage() {
  const [isOpenEditeBlog, setIsOpenEditeBlog] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [Blogs, setBlogs] = useState([]);
  const ref = useRef(null);
  const [blogId, setBlogId] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenDeletBlogPopUp, setIsOpenBlogPopUp] = useState(false);
  const [isOpenCommentPopUp, setIsOpenCommentPopUp] = useState(false);
  // console.log("videos", videos);
  const openEditeBlogFrom = (blogId) => {
    setIsOpenEditeBlog(true);
    setBlogId(blogId);
  };

  const closeEditeBlogFrom = () => {
    setIsOpenEditeBlog(false);
  };

  const openComment = (videoId) => {
    setIsOpenCommentPopUp(true);
    setBlogId(videoId);
  };

  const CloseCommentPopUp = () => {
    setIsOpenCommentPopUp(false);
  };

  const openDeletBlogPopUp = (blogId) => {
    console.log("funcation blog id", blogId);
    setIsOpenBlogPopUp(true);
    setBlogId(blogId);
  };

  const closeDeletBlogPopUp = () => {
    setIsOpenBlogPopUp(false);
  };
  console.log("blog id", blogId);
  useEffect(() => {
    ref.current.continuousStart();
    const userBlog = async () => {
      try {
        const response = await getUserBlog(userData.data._id);
        const sortedBlogss = response.data.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sortedBlogss);
        console.log("blogs", sortedBlogss);
      } catch (error) {
        console.log("videoPage error : ", error);
      } finally {
        ref.current.complete();
      }
    };
    if (userData.data._id) {
      userBlog();
    }
  }, [userData.data._id]);

  const handleSearch = debounce(async (query) => {
    try {
      if (query) {
        const response = await searchUserBlog(query);
        setSearchResults(response.data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log("Error searching blogs:", error);
    }
  }, 300); // Debounce for 300ms

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const blogsToShow = searchTerm ? searchResults : Blogs;
  return (
    <div className="container-fluid my-4 blog-Page videoPage-nav-bar">
      <LoadingBar color="#f11946" ref={ref} />
      {isOpenDeletBlogPopUp && (
        <BlogDelete onClose={closeDeletBlogPopUp} blogId={blogId} />
      )}
      {isOpenEditeBlog && (
        <BlogEdite onClose={closeEditeBlogFrom} BlogId={blogId} />
      )}
      {isOpenCommentPopUp && (
        <CommentPopup
          userId={userData.data._id}
          postId={blogId}
          onClose={CloseCommentPopUp}
        />
      )}
      <div className="row justify-content-lg-center">
        <div className="col-12  nav-ber d-flex  justify-content-around">
          <NavLink to="/uplod-video">Video</NavLink>
          <NavLink to="/uplod-blog">Blog</NavLink>
        </div>
      </div>
      <div className="row justify-content-lg-center">
        <div className="col-12 blog-input-page video-page-input-box d-flex">
          <i className="ri-menu-search-line mt-1 "></i>
          <input
            type="text"
            placeholder="Search your blog"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="row ">
        <div className="col-12 mt-2 w-50">
          <h5>Blogs</h5>
        </div>
      </div>
      {blogsToShow?.map((item) => (
        <div
          className="row grid d-flex justify-content-md-center blog-page-components"
          key={item._id}
        >
          <div className="col-lg-12 col-md-12  d-block col-12  mt-4 blog-components ">
            <div className="blog-item w-100">
              <img className="" src={`${item.Image}`} alt="" />
              <div className="title mt-3 mx-3">
                <span> {item.title}</span>
              </div>
              <div className="blog-content mt-3 mx-3">
                <span>{item.content}</span>
              </div>
              <div className="views-love-coments d-flex  justify-content-between  mt-5">
                <div className="views mx-3">
                  <i className="ri-eye-line"></i>
                  <span>{item.Views}</span>
                </div>
                <div className="love">
                  <i className="ri-heart-line"></i>
                  <span>{item.likeCount}</span>
                </div>
                <div
                  className="comments mx-3"
                  onClick={() => openComment(item._id)}
                >
                  <i className="ri-message-2-line"></i>
                  <span>{item.commentsCount}</span>
                </div>
              </div>
              <div className="blog-analatyc d-flex justify-content-between mt-5 my-4">
                <i
                  className="ri-pencil-line blog-analyse-icon mx-3"
                  onClick={() => openEditeBlogFrom(item._id)}
                ></i>
                <i className="ri-bar-chart-box-line blog-analyse-icon"></i>
                <i
                  className="ri-delete-bin-line video-analyse-icon mx-3"
                  onClick={() => openDeletBlogPopUp(item._id)}
                ></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UplodBlogPage;
