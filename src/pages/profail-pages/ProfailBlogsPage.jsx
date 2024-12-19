import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserBlog } from "../../backend/blogApi/blogApi";
import BlogDelete from "../../components/popupComponents/BlogDelete";
import BlogEdite from "../../components/popupComponents/BlogEdite";
import { useNavigate, useParams } from "react-router";
import CommentPopup from "../../components/popupComponents/CommentPopup";
import LoadingBar from "react-top-loading-bar";
import { Link } from "react-router-dom";

function ProfailBlogsPage() {
  const [isOpenEditeBlog, setIsOpenEditeBlog] = useState(false);
  const ref = useRef();
  const userData = useSelector((state) => state.auth.userData);
  const [Blogs, setBlogs] = useState([]);
  const [blogId, setBlogId] = useState();
  const [isOpenDeletBlogPopUp, setIsOpenBlogPopUp] = useState(false);
  const { id } = useParams();
  const [isOpenCommentPopUp, setIsOpenCommentPopUp] = useState(false);
  const naviget = useNavigate();
  // console.log("videos", videos);

  const handelVideoAnalyses = (blogId) => {
    naviget(`/video-analytice/${blogId}`);
  };

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
        const response = await getUserBlog(id);
        const sortedBlogss = response.data.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sortedBlogss);
        console.log("blogs", response);
      } catch (error) {
        console.log("BlogPage error : ", error);
      } finally {
        ref.current.complete();
      }
    };
    if (id) {
      userBlog();
    }
  }, []);

  return (
    <div className="container-fluid my-4 profail-blog-page blog-Page videoPage-nav-bar mt-2">
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
      {Blogs?.map((item) => (
        <div
          className="row  d-flex justify-content-md-center blog-page-components"
          key={item._id}
        >
          <div className="col-lg-6 col-md-6 col-12  d-block   mt-4 blog-components ">
            <div className="blog-item w-100">
              <img className="" src={`${item.Image}`} alt="" />
              <div className="blog-titles mt-3 mx-3">
                <span> {item.title}vxcvxcvxcvxcvxcvxcvxzzxczx</span>
              </div>
              <div className="blog-contents mt-4 mx-3">
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
                  className="ri-pencil-line blog-analyse-icon edite-icon mx-2"
                  onClick={() => openEditeBlogFrom(item._id)}
                ></i>

                <i
                  className="ri-bar-chart-box-line blog-analyse-icon analytic"
                  onClick={() => handelVideoAnalyses(item._id)}
                ></i>

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

export default ProfailBlogsPage;
