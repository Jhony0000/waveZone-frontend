import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserVideo, searchUserVideo } from "../backend/videoApi/videoApi";
import { useSelector } from "react-redux";
import EditeVideo from "../components/popupComponents/EditeVideo";
import DeleteVideoPopUp from "../components/popupComponents/DeleteVideoPopUp";
import { formatDistanceToNow } from "date-fns";
import CommentPopUp from "../components/popupComponents/CommentPopup";
import debounce from "lodash.debounce";
import LoadingBar from "react-top-loading-bar";
import { Link } from "react-router-dom";

function VideoPage() {
  const [isOpenEditeVideo, setIsOpenEditeVideo] = useState(false);
  const ref = useRef(null);
  const userData = useSelector((state) => state.auth.userData);
  const [videos, setVideos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [isOpenDeletVideoPopUp, setIsOpenDeletePopUp] = useState(false);
  const [isOpenCommentPopUp, setIsOpenCommentPopUp] = useState(false);
  const naviget = useNavigate();

  const openEditeVideoFrom = (videoId) => {
    setIsOpenEditeVideo(true);
    setVideoId(videoId);
  };
  const openComment = (videoId) => {
    setIsOpenCommentPopUp(true);
    setVideoId(videoId);
  };
  const closeCommentPopUp = () => setIsOpenCommentPopUp(false);
  const closeEditeVideoFrom = () => setIsOpenEditeVideo(false);
  const openDeletVideoPopUp = (videoId) => {
    setIsOpenDeletePopUp(true);
    setVideoId(videoId);
  };
  const closeDeletevideoPopUp = () => setIsOpenDeletePopUp(false);

  // Fetch all user videos
  const handelVideoAnalyses = (videoId) => {
    naviget(`/video-analytice/${videoId}`);
  };

  useEffect(() => {
    ref.current.continuousStart();
    const fetchUserVideos = async () => {
      try {
        const response = await getUserVideo(userData.data._id);
        const sortedVideos = response.data.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setVideos(sortedVideos);
      } catch (error) {
        console.log("Error fetching videos:", error);
      } finally {
        ref.current.complete();
      }
    };
    fetchUserVideos();
  }, [userData]);

  // Search for videos
  const handleSearch = debounce(async (query) => {
    try {
      if (query) {
        const response = await searchUserVideo(query);
        setSearchResults(response.data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log("Error searching videos:", error);
    }
  }, 300); // Debounce for 300ms

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const videosToShow = searchTerm ? searchResults : videos;

  return (
    <div className="mx-2 container-fluid my-4 video-page videoPage-nav-bar">
      <LoadingBar color="#f11946" ref={ref} />
      {isOpenEditeVideo && (
        <EditeVideo onClose={closeEditeVideoFrom} videoId={videoId} />
      )}
      {isOpenDeletVideoPopUp && (
        <DeleteVideoPopUp onClose={closeDeletevideoPopUp} videoId={videoId} />
      )}
      {isOpenCommentPopUp && (
        <CommentPopUp
          userId={userData.data._id}
          postId={videoId}
          onClose={closeCommentPopUp}
        />
      )}
      <div className="row mx-2">
        <div className="col-12 nav-ber d-flex justify-content-around">
          <NavLink to="/uplod-video">Video</NavLink>
          <NavLink to="/uplod-blog">Blog</NavLink>
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-12 video-page-input-box d-flex">
          <i className="ri-menu-search-line mt-1"></i>
          <input
            type="text"
            placeholder="Search your video"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-12 mt-3 video-nav mt-1 d-flex">
          <span className="fw-bold h3">Videos</span>
        </div>
      </div>
      <div className="row mx-2 d-flex justify-content-between mt-2">
        {videosToShow.map((item) => (
          <div
            className="col-lg-6 col-md-6 col-12 d-flex mt-3 video-components"
            key={item._id}
          >
            <div className="video-item">
              <video src={`${item.videoFile}`} controls></video>
              <div className="title mt-2 mx-3">{item.title}</div>
              <div className="uplod-time mx-3 mt-4">
                {formatDistanceToNow(new Date(item.createdAt))}
              </div>
              <div className="views-love-coments d-flex justify-content-between mt-5">
                <div className="views mx-3">
                  <i className="ri-eye-line"></i>
                  <span>{item.views}</span>
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
              <div className="video-analatyc d-flex justify-content-between mt-5 my-4">
                <i
                  className="ri-pencil-line video-analyse-icon mx-3"
                  onClick={() => openEditeVideoFrom(item._id)}
                ></i>

                <i
                  className="ri-bar-chart-box-line video-analyse-icon"
                  onClick={() => handelVideoAnalyses(item._id)}
                ></i>

                <i
                  className="ri-delete-bin-line video-analyse-icon mx-3"
                  onClick={() => openDeletVideoPopUp(item._id)}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoPage;
