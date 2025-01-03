import React, { useEffect, useState, useRef } from "react";
import { socket } from "../socket"; // Ensure socket is correctly initialized
import { getMixFeed, updateVideoView } from "../backend/videoApi/videoApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CommentPopup from "./popupComponents/CommentPopup";
import LoadingBar from "react-top-loading-bar";

function VideoCard() {
  const [isOpenCommentPopUp, setIsOpenCommentPopUp] = useState(false);
  const ref = useRef(null);
  const [videoId, setVideoId] = useState(null);
  const [videos, setVideos] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.data?._id;

  const openCommentPopUp = (videoId) => {
    setIsOpenCommentPopUp(true);
    setVideoId(videoId);
  };

  const closeCommentPopUp = () => {
    setIsOpenCommentPopUp(false);
  };

  useEffect(() => {
    if (videoId) {
      socket.emit("joinRoom", videoId); // Ensure the client joins the room
    }
  }, [userId]);
  // Socket event for real-time like updates
  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log(`Socket event received: ${event}`, args);
    });
  }, []);

  useEffect(() => {
    const handleLikeUpdate = (data) => {
      console.log("Received likeUpdate event:", data);
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video._id === data.postId
            ? {
                ...video,
                likeCount: data.likeCount,
                isLiked: data.likedBy.includes(userId), // Ensure isLiked is updated correctly
              }
            : video
        )
      );
    };

    socket.on("likeUpdate", handleLikeUpdate);

    return () => {
      socket.off("likeUpdate", handleLikeUpdate);
    };
  }, [userId]);

  useEffect(() => {
    console.log("Socket connection status:", socket.connected);
  }, []);

  // Fetch videos and determine initial like state
  useEffect(() => {
    ref.current.continuousStart();
    const fetchVideos = async () => {
      try {
        const response = await getMixFeed(userId);
        const fetchedVideos = response.data.data.videos.map((videoItem) => ({
          ...videoItem,
          isLiked: videoItem.likedBy?.includes(userId), // Check likedBy array
        }));
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        ref.current.complete();
      }
    };

    if (userId) {
      fetchVideos();
    }
  }, [userId]);

  // Optimistic UI update for likes
  const handleLike = (videoId) => {
    setVideos((prevVideos) =>
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

    socket.emit("like", { userId, postId: videoId });
  };

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
      {isOpenCommentPopUp && (
        <CommentPopup
          onClose={closeCommentPopUp}
          userId={userId}
          postId={videoId}
        />
      )}
      {videos.map((videoItem) => (
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
                <div className="title mt-3 blog-content mx-4">
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
                    className={`fa fa-heart ${
                      videoItem.isLiked ? "liked" : ""
                    }`}
                    onClick={() => handleLike(videoItem?._id)}
                  />
                  <span className="mx-1 like-count">{videoItem.likeCount}</span>
                </div>
                <div className="comments">
                  <i
                    className="ri-chat-1-line like-count"
                    onClick={() => openCommentPopUp(videoItem._id)}
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
