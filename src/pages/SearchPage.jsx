import React, { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { userSearch } from "../backend/userApi/apiService";
import CommentPopup from "../components/popupComponents/CommentPopup";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { debounce } from "lodash";
import LoadingBar from "react-top-loading-bar";

function SearchPage() {
  const [people, setPeople] = useState([]);
  const [video, setVideo] = useState([]);
  const [postId, setPostId] = useState(null);
  const ref = useRef(null);
  const [isOpenCommentPopUp, setIsOpenCommentPopUp] = useState(false);
  const [blog, setBlog] = useState([]);
  const [clickHart, setClickHart] = useState({});
  const userData = useSelector((state) => state.auth.userData);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchText) => {
      ref.current.continuousStart();
      try {
        const response = await userSearch(searchText);
        setPeople(response.data.data?.people);
        setVideo(response.data.data.videos);
        setBlog(response.data.data.posts);
      } catch (error) {
        console.log("Search error:", error);
      } finally {
        ref.current.complete();
      }
    }, 500),
    []
  ); // Debounced by 500ms

  const handleHartBtn = (id, type) => {
    setClickHart((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the like for the specific post/video
    }));
    // Emit like event via Socket.IO for real-time update
    io.emit("like", { postId: id, userId: userData.data._id, type });
  };

  const openCommentPopUp = (postId) => {
    setIsOpenCommentPopUp(true);
    setPostId(postId);
  };

  const closeCommentPopUp = () => setIsOpenCommentPopUp(false);

  return (
    <div className="container-fluid search-page">
      <LoadingBar color="#f11946" ref={ref} />
      {isOpenCommentPopUp && (
        <CommentPopup
          onClose={closeCommentPopUp}
          userId={userData.data._id}
          postId={postId}
        />
      )}
      <div className="row ">
        <div className="col-12 d-flex justify-content-center position-fixed">
          <div className="search-box">
            <input
              type="text"
              className="search-input mt-2"
              placeholder="Search"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* Display Users */}
      <div className="row my-5 for-border ">
        {people?.map((user) => (
          <Link
            key={user._id}
            to={`/profail/${user._id}`}
            className="col-12 mt-3"
          >
            <div>
              <img className="user-img" src={user.avatar} alt="" />
              <span className="mx-2 full-name">{user.FulName}</span>
              <span className="user-name">{user.userName}</span>
            </div>
          </Link>
        ))}
      </div>
      {/* Display Videos */}
      <div className="row my-4">
        {video?.map((vid) => (
          <div key={vid._id} className="col-12 for-border py-1">
            <Link className="d-flex" to={`/profail/${vid.owner?._id}`}>
              <img className="user-imgs my-3" src={vid.owner?.avatar} alt="" />
              <div className="name mt-3">
                <span className="mx-2 full-name">{vid.owner?.FulName}</span>
                <div className="date mx-2">
                  <span className="post-time">
                    {formatDistanceToNow(new Date(vid.createdAt))}
                  </span>
                </div>
              </div>
            </Link>
            <div className="title mx-3 my-1 h6">
              <span>{vid.title}</span>
            </div>
            <video
              className="w-100 user-video"
              autoPlay
              muted
              controls
              src={vid.videoFile}
            ></video>
            <div className="d-flex justify-content-around mt-2 my-3">
              <div className="love-icon">
                <i
                  className="fa fa-heart"
                  style={{
                    fontSize: "12px",
                    color: clickHart[vid._id] ? "red" : "rgb(58, 56, 56)",
                  }}
                  onClick={() => handleHartBtn(vid._id, "video")}
                />
                <span className="mx-1 like-count">{vid.likeCount}</span>
              </div>
              <div>
                <i
                  className="ri-chat-1-line view-icon"
                  onClick={() => openCommentPopUp(vid._id)}
                >
                  <span className="mx-1 views-count">{vid.commentsCount}</span>
                </i>
              </div>
              <div>
                <i className="ri-bar-chart-grouped-fill view-icon">
                  <span className="mx-1 views-count">{vid.views}</span>
                </i>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Display Blogs */}
      <div className="row my-2">
        {blog?.map((post) => (
          <div key={post._id} className="col-12 for-border py-">
            <Link className="d-flex" to={`/profail/${post.owner?._id}`}>
              <img className="user-imgs " src={post.owner?.avatar} alt="" />
              <div className="name mt-">
                <span className="mx-2 full-name">{post.owner?.FulName}</span>
                <div className="date mx-2">
                  <span className="post-time">
                    {formatDistanceToNow(new Date(post.createdAt))}
                  </span>
                </div>
              </div>
            </Link>
            <div className="title mx-3 my-2 h6">
              <span>{post.title}</span>
            </div>
            <div className="blog-content">
              <span className="mx-3">{post.content}</span>
            </div>
            <div className="content-img pt-3 mx-3">
              <img className="w-100" src={post.Image} alt="" />
            </div>
            <div className="d-flex justify-content-around mt-2">
              <div className="love-icon">
                <i
                  className="fa fa-heart"
                  style={{
                    fontSize: "12px",
                    color: clickHart[post._id] ? "red" : "rgb(58, 56, 56)",
                  }}
                  onClick={() => handleHartBtn(post._id, "blog")}
                />
                <span className="mx-1 like-count">{post.likeCount}</span>
              </div>
              <div>
                <i
                  className="ri-chat-1-line view-icon"
                  onClick={() => openCommentPopUp(post._id)}
                >
                  <span className="mx-1 views-count">{post.commentsCount}</span>
                </i>
              </div>
              <div>
                <i className="ri-bar-chart-grouped-fill view-icon">
                  <span className="mx-1 views-count">{post.Views}</span>
                </i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
