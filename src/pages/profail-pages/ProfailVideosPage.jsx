import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { getUserVideo } from "../../backend/videoApi/videoApi";
import { useSelector } from "react-redux";
import EditeVideo from "../../components/popupComponents/EditeVideo";
import DeleteVideoPopUp from "../../components/popupComponents/DeleteVideoPopUp";
import { formatDistanceToNow } from "date-fns";
import CommentPopup from "../../components/popupComponents/CommentPopup";

function ProfailVideosPage() {
  const [isOpenEditeVideo, setIsOpenEditeVideo] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState(null);
  const { id } = useParams();
  const naviget = useNavigate();
  const [deleteVideoId, setDeleteVideoId] = useState();
  const [isOpenDeletVideoPopUp, setIsOpenDeletePopUp] = useState(false);
  const [isOpenCommentPopUp, setIsOpenCommentPopUp] = useState(false);

  const openEditeVideoFrom = (videoId) => {
    setIsOpenEditeVideo(true);
    setVideoId(videoId);
  };

  const closeEditeVideoFrom = () => {
    setIsOpenEditeVideo(false);
  };
  const openComment = (videoId) => {
    setIsOpenCommentPopUp(true);
    setVideoId(videoId);
  };
  const CloseCommentPopUp = () => {
    setIsOpenCommentPopUp(false);
  };

  const openDeletVideoPopUp = (videoId) => {
    setIsOpenDeletePopUp(true);
    setVideoId(videoId);
  };

  const closeDeletevideoPopUp = () => {
    setIsOpenDeletePopUp(false);
  };

  const handelVideoAnalyticPage = (videoId) => {
    setVideoId(videoId);
    naviget(`/video-analytice/${videoId}`);
  };

  useEffect(() => {
    const userVideo = async () => {
      try {
        const response = await getUserVideo(id);
        const sortedVideos = response.data.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        // console.log(response);
        setVideos(sortedVideos);
      } catch (error) {
        console.log("videoPage error : ", error);
      }
    };
    if (userData.data._id) {
      userVideo();
    }
  }, [videos, userData]);
  // console.log("videoid", videoId);
  return (
    <div className="mx-2  container-fluid my-4 video-page  videoPage-nav-bar mt-2">
      <div className="mx-2  container-fluid my-4 video-page videoPage-nav-bar"></div>
      {isOpenEditeVideo && (
        <EditeVideo onClose={closeEditeVideoFrom} videoId={videoId} />
      )}
      {isOpenDeletVideoPopUp && (
        <DeleteVideoPopUp onClose={closeDeletevideoPopUp} videoId={videoId} />
      )}
      {isOpenCommentPopUp && (
        <CommentPopup
          userId={userData.data._id}
          postId={videoId}
          onClose={CloseCommentPopUp}
        />
      )}
      <div className="row profile-video-components mx-2 d-flex justify-content-between  mt-2">
        {videos.map((item) => (
          <div
            className="col-lg-6  col-12 d-flex mt-3 video-components"
            key={item._id}
          >
            <div className="video-item">
              <video src={`${item.videoFile}`} controls></video>
              <div className="video-title  mx-3">
                <span>{item.title}</span>
              </div>
              <div className="uplod-time mx-3 mt-4">
                {" "}
                {formatDistanceToNow(new Date(item.createdAt))}
              </div>
              <div className="views-love-coments d-flex  justify-content-between  mt-5">
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
              {userData.data._id === id && (
                <div className="video-analatyc d-flex justify-content-between mt-5 my-4">
                  <i
                    className="ri-pencil-line video-analyse-icon mx-3"
                    onClick={() => openEditeVideoFrom(item._id)}
                  ></i>
                  {/* <Link to={`/video-analytice/${videoId}`}> */}{" "}
                  <i
                    className="ri-bar-chart-box-line video-analyse-icon"
                    onClick={() => handelVideoAnalyticPage(item._id)}
                  ></i>
                  {/* </Link> */}
                  <i
                    className="ri-delete-bin-line video-analyse-icon mx-3"
                    onClick={() => openDeletVideoPopUp(item._id)}
                  ></i>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfailVideosPage;
