import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { uplodVdieo } from "../../backend/videoApi/videoApi";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

function VideoFrom({ onClose, videoFile, parantClose }) {
  const ref = useRef(null);
  const { register, handleSubmit } = useForm();
  const [title, setTitle] = useState("");
  const [titleLength, setTitleLength] = useState(null);
  const navigate = useNavigate();
  const [isCloseVideoPopUp, setIsCloseVideoPopUp] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  console.log("title", title);
  console.log("videoFile", videoFile);

  const gettitle = (title) => {
    setTitle(title);
    setTitleLength(title.length);
  };

  const videoUplod = async () => {
    ref.current.continuousStart();
    try {
      const response = await uplodVdieo({
        title: title,
        videoFile: videoFile,
        userId: userData.data._id,
      });
      console.log("response", response);

      onClose();
      parantClose();
      navigate("/uplod-video");
      console.log("uplod successfully");
    } catch (error) {
      console.log("video From error", error);
    } finally {
      ref.current.complete();
    }
  };

  return ReactDOM.createPortal(
    <div>
      <LoadingBar color="#f11946" ref={ref} />
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="d-flex  close-btn-section justify-content-between">
            <h6 className="fw-bold title-hading text-start">
              {title ? title : videoFile.name}
            </h6>
            <button onClick={onClose} className="">
              <i class="ri-close-large-line"></i>
            </button>
          </div>
          <div className="user-uplod-detels mt-3">
            <div className="postFrom-message-fro-user mt-2">
              {title.length > 200 && (
                <span className="text-danger">
                  Title must be less than 200 character
                </span>
              )}
            </div>

            <textarea
              maxLength={200}
              placeholder="Title..."
              className={`mt-4 w-100 ${
                title.length > 200 ? "postFrom-title-outline" : ""
              }`}
              {...register("title", {
                required: true,
              })}
              onChange={(e) => gettitle(e.target.value)}
            />
            {
              <p className="text-end post-from-length-count">
                length : {!titleLength ? 0 : titleLength}/200
              </p>
            }
            {title.length <= 200 && (
              <button
                className="post-from-btn"
                onClick={() => (title.length > 0 ? videoUplod() : null)}
              >
                Submit
              </button>
            )}
          </div>
          <div className="warning-message-for-user-to text-start">
            <i className="ri-file-warning-line"></i>
            <span className="mx-2">
              write a title according to your video. don't brake any rules
              according this app.if you brake any rules your account delete by
              waveZone . <br /> <Link className="mx-4">see more</Link>
            </span>
          </div>
        </div>
      </div>
    </div>,

    document.body
  );
}

export default VideoFrom;
