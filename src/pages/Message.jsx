import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateNewMessagePopUp from "../components/popupComponents/CreateNewMessagePopUp";
import { getAllUserMessageProfail } from "../backend/messageApi/messageApi";
import LoadingBar from "react-top-loading-bar";

function Message() {
  const [userPrfoail, setUserPrfoail] = useState([]);
  const ref = useRef(null);
  const [isOpenNewMessagePopUp, setIsOpenNewMessagePopUp] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  const openMessagePopUp = () => setIsOpenNewMessagePopUp(true);
  const closeMessagePopUp = () => setIsOpenNewMessagePopUp(false);

  useEffect(() => {
    ref.current.continuousStart();
    const getAllMessageProfail = async () => {
      try {
        const response = await getAllUserMessageProfail(userData.data._id);

        // Extract unique users based on createId and sendId
        const uniqueProfiles = [];
        const userMap = new Map();

        response.data.data.forEach((item) => {
          const isCurrentUserSender = item.sendId?._id === userData.data._id;
          const profileToShow = isCurrentUserSender
            ? item.createId
            : item.sendId;

          if (!userMap.has(profileToShow._id)) {
            userMap.set(profileToShow._id, profileToShow);
            uniqueProfiles.push(profileToShow);
          }
        });

        setUserPrfoail(uniqueProfiles);
        console.log("Unique profiles:", uniqueProfiles);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      } finally {
        ref.current.complete();
      }
    };

    if (userData.data._id) {
      getAllMessageProfail();
    }
  }, [userData.data._id]);

  return (
    <div className="container-fluid message-page">
      <LoadingBar color="#f11946" ref={ref} />
      {isOpenNewMessagePopUp && (
        <CreateNewMessagePopUp onClose={closeMessagePopUp} />
      )}
      <div className="row">
        <div className="col-4 user-friend-section scrollable-div">
          <input type="text" placeholder="Search friend" />
          <div className="create-message">
            <button
              className="btn btn-primary mt-3 fw-bold "
              onClick={openMessagePopUp}
            >
              New message
            </button>
          </div>
          {userPrfoail.map((profile) => (
            <Link to={`/message-send/${profile._id}`} key={profile._id}>
              <div className="row mt-1">
                <div className="col-12 d-flex align-items-center mt-4 user-friend-img user-friend-info">
                  <div className="d-flex friend-profail-section">
                    <div className="friend-img">
                      <img
                        src={`${profile?.avatar}`}
                        alt="Profile"
                        className="rounded-circle"
                      />
                    </div>
                    <span className="fw-bold full-name mx-1">
                      {profile?.FulName}
                    </span>{" "}
                    .
                    <span className=" user-name  text-muted">
                      @{profile?.userName}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="col-8 mx-5 create-message-section mt-4 position-fixed">
          <div className="h-100 w-100 mx-5   mt-4">
            <div className="text-center">
              <div className="div">
                <span className="text-muted">Add new Friend</span>
              </div>
              <button
                className="btn btn-primary fw-bold mt-2"
                onClick={openMessagePopUp}
              >
                New message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
