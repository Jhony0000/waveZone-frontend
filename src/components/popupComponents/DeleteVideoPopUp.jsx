import React, { useState } from "react";
import ReactDOM from "react-dom";
import { deleteVideo } from "../../backend/videoApi/videoApi";

function DeleteVideoPopUp({ onClose, videoId }) {
  const [isYesChecked, setIsYesChecked] = useState(false);
  const [isNoChecked, setIsNoChecked] = useState(false);
  console.log("video ID deleteVideo", videoId);
  const handleYesCheckboxChange = (e) => {
    setIsYesChecked(e.target.checked);
    if (e.target.checked) {
      setIsNoChecked(false);
    }
  };

  const handleNoCheckboxChange = (e) => {
    setIsNoChecked(e.target.checked);
    if (e.target.checked) {
      setIsYesChecked(false);
    }
  };

  const cancelDelete = () => {
    if (isNoChecked) {
      onClose();
    }
  };

  const deleteUserVideo = async () => {
    try {
      if (isYesChecked) {
        await deleteVideo({ videoId: videoId });
        onClose();
      }
    } catch (error) {
      console.log("video delete pop up Error : ", error);
      throw error;
    }
  };

  return ReactDOM.createPortal(
    <div className="deleteVideo-pop-up">
      <div className="container-fluid delete-Video-content">
        <div className="row">
          <div className="col-12">
            <div className="d-flex close-btn-section justify-content-between">
              <h5 className="fw-bold">Delete video</h5>
              <button onClick={onClose} className="">
                <i className="ri-close-large-line"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-start mt-3">
            <span className="fw-bold">
              Are you sure this video should be deleted?
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 delete mesage mt-4">
            <div className="form-check text-start">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckYes"
                checked={isYesChecked}
                onChange={handleYesCheckboxChange}
              />
              <label
                className="form-check-label text-start"
                htmlFor="flexCheckYes"
              >
                Yes
              </label>
            </div>
            <div className="form-check mt-3 text-start">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckNo"
                checked={isNoChecked}
                onChange={handleNoCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckNo">
                No
              </label>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center d-flex justify-content-center">
            {!isNoChecked && (
              <button
                className="btn btn-danger fw-bold"
                onClick={deleteUserVideo}
              >
                Delete
              </button>
            )}
            {isNoChecked && (
              <button
                className="btn btn-primary fw-bold"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DeleteVideoPopUp;
