import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { searchUser } from "../../backend/messageApi/messageApi";
import { useEffect } from "react";
import { useRef } from "react";

function CreateNewMessagePopUp({ onClose }) {
  const [searchUserr, setSearchUser] = useState([]);
  const popupRef = useRef(null);
  // const [name, setName] = useState("");

  const searchUsers = async (e) => {
    try {
      const searchResult = await searchUser(e.target.value);
      setSearchUser(searchResult.data.data);
    } catch (error) {
      console.log("created new page message errro : ", error);
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log("search result", searchUserr);
  console.log("name", name);

  return ReactDOM.createPortal(
    <div className="create-new-message-pop-up">
      <div
        ref={popupRef}
        className="create-new-message-pop-up-content scrollable-div"
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 d-flex nav-section close-btn-section justify-content-between">
              <div className="close-popup-btn d-flex">
                <button onClick={onClose} className="">
                  <i className="ri-close-large-line"></i>
                </button>
                <span className="fw-bold mt-1 mx-2">New message</span>
              </div>
              <button className="btn-create">create</button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex nav-input">
              <i className="ri-search-line text-primary"></i>
              <input
                type="text"
                className="w-100"
                placeholder="Search people"
                onChange={searchUsers}
              />
            </div>
          </div>
          <div className="row select-user-section w-100 mt-1">
            {searchUserr.map((item) => (
              <Link
                key={item._id}
                to={`/message-send/${item._id}`}
                onClick={onClose}
              >
                <div className="col-12 mt-3 d-flex w-100 select-user-section-user-profail">
                  <div className="img">
                    <img src={`${item.avatar}`} alt="" />
                  </div>
                  <div className="name">
                    <div className="full-name">
                      <span className="fw-bold text-start">{item.FulName}</span>
                    </div>
                    <div className="userName">
                      <span className="userName text-muted text-start">
                        {item.userName}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CreateNewMessagePopUp;
