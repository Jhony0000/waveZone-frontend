import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FiUpload } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import VideoFrom from "./videoFrom/VideoFrom";

function VideoUploadPopup({ onClose, onUpload, isCloseVideoPopup = false }) {
  const [videoFile, setVideoFile] = useState(null);
  // const [onOpenBtn, setOnOpenBtn] = useState(false);
  const [isOpenVideoFrom, setIsOpenVideoFrom] = useState(false);
  const navigate = useNavigate();

  (function closeVideoPopUp() {
    if (isCloseVideoPopup == true) {
      onClose();
    }
  })();

  console.log("isclosevideopopup", isCloseVideoPopup);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (videoFile) {
      onUpload(videoFile);
    }
    setIsOpenVideoFrom(true);

    console.log("is open popup", setIsOpenVideoFrom);
  };

  const onCloses = () => {
    setIsOpenVideoFrom(false);
  };

  // console.log("video file", videoFile);

  return ReactDOM.createPortal(
    <div>
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="d-flex  close-btn-section justify-content-between">
            <h5 className="fw-bold">Uplod video</h5>
            <button onClick={onClose} className="">
              <i className="ri-close-large-line"></i>
            </button>
          </div>
          <div className="uplod-fiels">
            <label htmlFor="video-upload" className="custom-upload-button">
              {/* <FiUpload size={20} /> Optional icon */}
              <i className="ri-upload-line"></i>
            </label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the default file input
            />
            <br></br>
            <div className="message-for-user mt-3">
              <span className="text-muted ">
                Place click uplod icon than select your file <br /> Than click
                next button
              </span>
            </div>
            <br />
            <button
              className={`${
                !videoFile
                  ? "d-none"
                  : "d-block text-center uplod-video-file-next-btn"
              }`}
              onClick={handleUpload}
            >
              Next
            </button>
            {isOpenVideoFrom && (
              <VideoFrom
                videoFile={videoFile}
                onClose={onCloses}
                parantClose={onClose}
              />
            )}
          </div>
          <div className="warning-message-for-user text-start">
            <i className="ri-file-warning-line"></i>
            <span className="mx-2">
              Do not use any kind of music in your video.do not uplod any
              illegal video.don't brake any rules according this app.if you
              brake any rules your account delete by waveZone .{" "}
              <Link>see more</Link>
            </span>
          </div>
        </div>
      </div>
    </div>,

    document.body
  );
}

export default VideoUploadPopup;
