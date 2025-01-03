import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateAccount,
  changeAvatarImg,
  changeCoverImg,
  changePassword,
} from "../../backend/userApi/apiService.js";
import LoadingBar from "react-top-loading-bar";

function EditeProfailPopUp({ onClose }) {
  const ref = useRef(null);
  const userData = useSelector((state) => state.auth.userData);
  const { handleSubmit } = useForm();

  const [selectedCoverImg, setSelectedCoverImg] = useState(
    userData.data.coverImg
  );
  const [selectedCoverImgUrl, setSelectedCoverImgUrl] = useState("");

  const [selectedAvaterImg, setSelecetedAvaterImg] = useState(
    userData.data.avatar
  );
  const [selectedAvaterImgUrl, setSelectedAvaterImgUrl] = useState("");

  const [FulName, setUpdatedFulName] = useState("");
  const [userName, setUpdatedUserName] = useState("");
  const [email, setUpdatedEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateAccountDetels = async () => {
    ref.current.continuousStart();
    try {
      if (email || userName || FulName) {
        await updateAccount({
          email: email,
          userName: userName,
          FulName: FulName,
        });
      }

      if (selectedAvaterImgUrl) {
        await changeAvatarImg(selectedAvaterImgUrl);
      }

      if (selectedCoverImgUrl) {
        await changeCoverImg(selectedCoverImgUrl);
      }

      if (oldPassword || newPassword) {
        await changePassword({
          oldPassword: oldPassword,
          newPassword: newPassword,
        });
      }
      onClose();
    } catch (error) {
      console.log("editePage Error : ", error);
    } finally {
      ref.current.complete();
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedCoverImgUrl(file);
    console.log(e.target.files);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedCoverImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handelAvaterImgChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvaterImgUrl(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelecetedAvaterImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return ReactDOM.createPortal(
    <div>
      <LoadingBar color="#f11946" ref={ref} />
      <div className="popup-overlay edite-popup-profail">
        <div className="popup-content container-fluid edite-popup-content scrollable-div">
          <div className="row">
            <div className="col-12 d-flex close-btn-section justify-content-between">
              <div className="close-popup-btn d-flex">
                <button onClick={onClose} className="">
                  <i className="ri-close-large-line"></i>
                </button>
                <h6 className="fw-bold mt-2 mx-5">Edite profile</h6>
              </div>
              <button className="btn-save" onClick={updateAccountDetels}>
                Save
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 bg-gray justify-content-center align-items-center">
              {selectedCoverImg ? (
                <img
                  className="w-100 cover-img"
                  src={selectedCoverImg}
                  alt="Cover"
                />
              ) : (
                <div className="cover-img-byDefult w-100"></div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 camera-icon-coverimg d-flex align-items-center justify-content-center">
              <div className="icon">
                <label htmlFor="cover-image-upload" className="">
                  <i className="ri-camera-ai-line"></i>
                </label>
                <input
                  id="cover-image-upload"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleCoverImageChange} // Handle image change
                  style={{ display: "none" }} // Hide the default file input
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-start">
              {selectedAvaterImg ? (
                <img
                  className="profail-img-user"
                  src={`${selectedAvaterImg}`}
                  alt=""
                />
              ) : (
                <img
                  src="\rendom-img.png"
                  className="profail-img-user"
                  alt="Default"
                />
              )}
            </div>
          </div>
          <div className="row ">
            <div className="col-12 d-flex justify-content-start user-profail-img-uplod-camra-icon ">
              <div className="icon">
                <label htmlFor="avatar-upload" className="">
                  <i className="ri-camera-ai-line"></i>
                </label>
                <input
                  id="avatar-upload"
                  onChange={handelAvaterImgChange}
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <input
                type="text"
                placeholder="Full name"
                onChange={(e) => setUpdatedFulName(e.target.value)}
                className="edite-prfoail-input w-100"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <input
                type="text"
                placeholder="User name"
                className="edite-prfoail-input w-100"
                onChange={(e) => setUpdatedUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <input
                type="email"
                placeholder="Email"
                className="edite-prfoail-input w-100"
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <input
                type="password"
                placeholder="old password"
                className="edite-prfoail-input w-100"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <input
                type="password"
                placeholder="new password"
                className="edite-prfoail-input w-100"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="warning-message-for-user text-start">
            <i className="ri-file-warning-line"></i>
            <span className="mx-2">
              Do not use any illegal photo.
              <Link>See more</Link>
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default EditeProfailPopUp;
