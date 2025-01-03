import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

import {
  getAllVideoComments,
  videoComment,
} from "../../backend/videoApi/videoApi";
import { formatDistanceToNow } from "date-fns";
import { socket } from "../../socket";

function CommentPopup({ postId, onClose, userId }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    if (postId) {
      socket.emit("joinRoom", postId); // Emit joinRoom event
    }

    return () => {
      socket.emit("leaveRoom", postId); // Leave the room on unmount
    };
  }, [postId]);

  useEffect(() => {
    // Listen for real-time comment updates
    socket.on("receiveComment", (newComment) => {
      setAllComments((prevComments) => [...prevComments, newComment]);
    });

    return () => {
      socket.off("receiveComment");
    };
  }, []);

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const response = await getAllVideoComments(postId);
        setAllComments(response.data.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    if (postId) {
      getAllComments();
    }
  }, [postId]);

  const postComment = () => {
    const newComment = {
      videoId: postId,
      userId,
      content: comment,
    };

    socket.emit("postComment", newComment);
    setComment(""); // Clear input field
  };

  return ReactDOM.createPortal(
    <div className="comment-overlay">
      <div className="comment-content">
        {/* Header */}
        <div className="nav d-flex justify-content-between">
          <h6>Comments</h6>
          <i className="ri-close-line" onClick={onClose}></i>
        </div>

        {/* Comments List */}
        <div className="comments-list ">
          {allComments.map((item) => (
            <div key={item._id} className="comment-item d-flex mt-2">
              <Link to={`/profail/${item.author._id}`}>
                {" "}
                <img src={`${item.author?.avatar}`} alt="Avatar" />
              </Link>

              <div className="info">
                <span className="user-name">{item.author?.userName}</span>.
                <span className="time mx-2">
                  {formatDistanceToNow(new Date(item.createdAt))}
                </span>
                <div className="comment-content-div">
                  <p className="content">{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="comment-input d-flex justify-content-center">
          <input
            type="text"
            value={comment}
            placeholder="Write a comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="post-btn" onClick={postComment}>
            Post
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CommentPopup;
