import React, { useEffect, useState, useRef } from "react";
import { socket } from "../socket"; // Make sure socket is correctly initialized
import { getMixFeed } from "../backend/videoApi/videoApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CommentPopup from "./popupComponents/CommentPopup";
import { updateVideoView } from "../backend/videoApi/videoApi";
import LoadingBar from "react-top-loading-bar";

function VideoCard() {
  const [isopenComentPopUp, setIsOpenComentPopUp] = useState(false);
  const ref = useRef(null);
  const [videoId, setVideoId] = useState(null);
  const [video, setVideo] = useState([]);
  const [clickHart, setClickHart] = useState({});
  const [videoLikes, setVideoLikes] = useState({}); // Store like status for each video
  const userData = useSelector((state) => state.auth.userData);
  const [watchTime, setWatchTime] = useState({}); // Track watch time for videos

  const handleHartBtn = (id, type) => {
    setClickHart((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the like for the specific post/video
    }));
    // Emit like event via Socket.IO for real-time update
    io.emit("like", { postId: id, userId: userData.data._id, type });
  };

  const opneCommentPopUp = (videoId) => {
    setIsOpenComentPopUp(true);
    setVideoId(videoId);
  };

  const closeCommentPopUp = () => {
    setIsOpenComentPopUp(false);
  };

  useEffect(() => {
    // Listen for real-time like updates
    socket.on("likeUpdate", ({ postId, likeCount, likedBy }) => {
      setVideo((prevVideos) =>
        prevVideos.map((video) =>
          video._id === postId
            ? {
                ...video,
                likeCount,
                isLiked: likedBy.includes(userData.data._id),
              }
            : video
        )
      );
    });

    return () => {
      socket.off("likeUpdate");
    };
  }, [userData]);

  const handelLike = (videoId) => {
    const userId = userData.data._id;

    setVideo((prevVideos) =>
      prevVideos.map((video) =>
        video._id === videoId
          ? {
              ...video,
              isLiked: !video.isLiked,
              likeCount: video.isLiked
                ? video.likeCount - 1
                : video.likeCount + 1,
            }
          : video
      )
    );

    // Emit the like event to the server
    socket.emit("like", { userId, postId: videoId });
  };

  useEffect(() => {
    ref.current.continuousStart();
    const fetchVideos = async () => {
      try {
        const response = await getMixFeed(userData.data?._id);
        console.log(response);
        const fetchedVideos = response.data.data.videos?.map((video) => ({
          ...video,
          isLiked: (video.likedBy || []).includes(userData.data._id),
        }));
        setVideo(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        ref.current.complete(); // Complete the loading bar
      }
    };

    if (userData.data._id) {
      fetchVideos();
    }
  }, [userData]);

  const handleTimeUpdate = (videoId, currentTime) => {
    setWatchTime((prev) => {
      const newWatchTime = { ...prev, [videoId]: (prev[videoId] || 0) + 1 };

      // If watch time exceeds 3 seconds, update the view count
      if (newWatchTime[videoId] >= 3) {
        updateVideoView({ videoId, userId: userData.data?._id });
      }

      return newWatchTime;
    });
  };

  return (
    <div className="div video-card">
      <LoadingBar color="#f11946" ref={ref} />
      {isopenComentPopUp && (
        <CommentPopup
          onClose={closeCommentPopUp}
          userId={userData.data._id}
          postId={videoId}
        />
      )}
      {video?.map((videoItem) => (
        <div className="container-fluid post-cards" key={videoItem._id}>
          <div className="row">
            <div className="col-12 post-cards-components mt-2">
              <div className="user-profile-section d-flex justify-content-between">
                <Link
                  className="d-flex"
                  to={`/profail/${videoItem.owner?._id}`}
                >
                  <div className="user-profile-img">
                    <img
                      className="user-profile-logo"
                      src={videoItem.owner?.avatar || "random-img.png"}
                      alt="logo"
                    />
                  </div>
                  <div className="name mt-1">
                    <span className="mx-2 full-name">
                      {videoItem.owner?.FulName}
                    </span>
                    <div className="date mx-2">
                      <span className="post-time">
                        {formatDistanceToNow(new Date(videoItem.createdAt))}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="report-icon">
                  <i className="ri-more-fill"></i>
                </div>
              </div>

              <div className="user-content">
                <div className="title mt-3  blog-content mx-4">
                  <span>{videoItem.title}</span>
                </div>
                <video
                  className="video mx-2"
                  controls
                  onTimeUpdate={(e) =>
                    handleTimeUpdate(videoItem._id, e.target.currentTime)
                  }
                >
                  <source src={videoItem.videoFile} type="video/mp4" />
                </video>
              </div>
              <div className="post-share-like-view my-3 d-flex justify-content-around">
                <div className="love-icon">
                  <i
                    className="fa fa-heart"
                    style={{
                      fontSize: "12px",
                      color: clickHart[videoItem._id]
                        ? "red"
                        : "rgb(58, 56, 56)",
                    }}
                    onClick={() => handleHartBtn(videoItem._id, "videoItem")}
                  />
                  <span className="mx-1 like-count ">
                    {videoItem.likeCount}
                  </span>
                </div>
                {/* <div className="like" onClick={() => handelLike(videoItem._id)}>
                {videoLikes[videoItem._id]?.isLiked ? "❤️" : "🤍"}
                  {videoLikes[videoItem._id]?.count || videoItem.likeCount}
                </div> */}
                <div className="comments">
                  <i
                    className="ri-chat-1-line like-count"
                    onClick={() => opneCommentPopUp(videoItem._id)}
                  >
                    <span className="like-count">
                      {videoItem.commentsCount}
                    </span>
                  </i>
                </div>
                <div className="views">
                  <i className="ri-bar-chart-grouped-fill like-count">
                    <span className="mx-1 like-count">{videoItem.views}</span>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoCard;
