import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { editeBlog } from "../../backend/blogApi/blogApi";
import { useSelector } from "react-redux";
import { ID } from "appwrite";

function BlogEdite({ onClose, BlogId }) {
  const [title, gettitle] = useState("");
  const [titleLength, setTitleLength] = useState(title.length);
  const userData = useSelector((state) => state.auth.userData);

  const eaditBlog = async () => {
    try {
      await editeBlog({ id: BlogId, title: title });
      onClose();
    } catch (error) {
      console.log("Eadite Blog page Error : ", error);
    }
  };
  return ReactDOM.createPortal(
    <div>
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="d-flex  close-btn-section justify-content-between">
            <h6 className="fw-bold title-hading text-start">
              {title ? title : "Edite Blog"}
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
              onChange={(e) => gettitle(e.target.value)}
            />
            {
              <p className="text-end post-from-length-count">
                length : {!titleLength ? 0 : titleLength}/200
              </p>
            }
            {title.length <= 200 && (
              <button className="post-from-btn" onClick={eaditBlog}>
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

export default BlogEdite;
