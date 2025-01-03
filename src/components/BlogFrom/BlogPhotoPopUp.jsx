import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { uplodBlog } from "../../backend/blogApi/blogApi";
import LoadingBar from "react-top-loading-bar";

function BlogPhotoPopUp({ blogTitle, blogContent, onClose, parantClose }) {
  const [PhotoFile, setPhotoFile] = useState("");
  const ref = useRef(null);
  const navigat = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const getPhoto = (file) => {
    setPhotoFile(file);
  };

  const blogUplod = async () => {
    ref.current.continuousStart();
    try {
      await uplodBlog({
        content: blogContent,
        title: blogTitle,
        Image: PhotoFile,
        userId: userData.data?._id,
      });
      onClose();
      parantClose();
      navigat("/uplod-blog");
    } catch (error) {
      console.log("blog uplod page error : ", error);
    } finally {
      ref.current.complete();
    }
  };

  // console.log("blogTitel :", blogTitle);
  // console.log("blogcontent :", blogContent);
  // console.log(PhotoFile);
  return ReactDOM.createPortal(
    <div className="pop-up-Photo-from popup-overlay">
      <LoadingBar color="#f11946" ref={ref} />
      <div className="pop-up-photo-content popup-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 d-flex justify-content-between">
              <h6 className="py-2">Uplod photo</h6>
              <i className="ri-close-large-fill" onClick={onClose}></i>
            </div>
          </div>
        </div>
        <div className="uplod-fiels">
          <label htmlFor="video-upload" className="custom-upload-button">
            <i className="ri-upload-line"></i>
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/* image/png, image/gif, image/jpeg"
            onChange={(e) => getPhoto(e.target.files[0])}
            style={{ display: "none" }}
          />
          <br></br>
          <div className="message-for-user mt-3">
            <span className="text-muted ">
              Place click uplod icon than select your file <br /> Than click
              next button
            </span>
          </div>
          <br />
          {PhotoFile && (
            <button className={``} onClick={blogUplod}>
              Uplod
            </button>
          )}
        </div>
        <div className="blog-photo-warning-massage d-flex">
          <i className="ri-file-warning-line"></i>
          <p className="text-start">
            don't use any spacific human photo.you use your content related
            photo . don't vaiolet any rules in this app . <Link>See more</Link>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default BlogPhotoPopUp;
