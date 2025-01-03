import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateNewMessagePopUp from "../components/popupComponents/CreateNewMessagePopUp";
import { getAllUserMessageProfail } from "../backend/messageApi/messageApi";
import LoadingBar from "react-top-loading-bar";
import { socket } from "../socket";

function Message() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [openedChats, setOpenedChats] = useState(new Set()); // Track opened chats
  const [messageCounts, setMessageCounts] = useState(new Map()); // Store message counts
  const ref = useRef(null);
  const [isOpenNewMessagePopUp, setIsOpenNewMessagePopUp] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  const openMessagePopUp = () => setIsOpenNewMessagePopUp(true);
  const closeMessagePopUp = () => setIsOpenNewMessagePopUp(false);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      ref.current.continuousStart();
      try {
        const response = await getAllUserMessageProfail(userData.data._id);

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

        setUserProfiles(uniqueProfiles);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      } finally {
        ref.current.complete();
      }
    };

    if (userData.data._id) {
      fetchUserProfiles();
      socket.emit("userOnline", userData.data._id); // Notify server about the logged-in user
    }

    // Listen for online users update from server
    socket.on("userOnline", (users) => {
      setOnlineUsers(new Set(users)); // Update online users list
    });

    // Listen for message count updates
    socket.on("messageCountUpdate", (chatId, count) => {
      setMessageCounts((prevCounts) => new Map(prevCounts).set(chatId, count)); // Update message count for the chat
    });

    return () => {
      socket.off("userOnline");
      socket.off("messageCountUpdate"); // Clean up the listener when the component unmounts
    };
  }, [userData.data._id]);

  // Function to handle profile click
  const handleProfileClick = (profileId) => {
    setOpenedChats((prevChats) => new Set(prevChats).add(profileId)); // Mark the chat as opened
  };

  return (
    <div className="container-fluid message-page">
      <LoadingBar color="#f11946" ref={ref} />
      {isOpenNewMessagePopUp && (
        <CreateNewMessagePopUp onClose={closeMessagePopUp} />
      )}
      <div className="row">
        {/* Left Section */}
        <div className="col-4 user-friend-section scrollable-div">
          <input
            type="text"
            placeholder="Search friend"
            className="form-control mb-3"
          />
          <div className="create-message">
            <button
              className="btn btn-primary mt-3 fw-bold"
              onClick={openMessagePopUp}
            >
              New message
            </button>
          </div>
          {userProfiles.map((profile) => (
            <div className="d-flex w-100 ">
              <Link
                to={`/message-send/${profile._id}`}
                className="w-100"
                key={profile._id}
              >
                <div
                  className="row mt-1"
                  onClick={() => handleProfileClick(profile._id)} // Mark the profile as opened
                >
                  <div className="col-12 d-flex align-items-center mt-4 user-friend-img user-friend-info">
                    <div className="d-flex friend-profile-section">
                      <div className="friend-img">
                        <img
                          src={`${profile?.avatar}`}
                          alt="Profile"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="friend-details mx-2">
                        <span className="fw-bold full-name">
                          {profile?.FulName}
                        </span>
                        <span className="user-name text-muted">
                          @{profile?.userName}
                        </span>
                        <div className="online-status mt-1">
                          <span
                            className={`badge ${
                              onlineUsers.has(profile._id)
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {onlineUsers.has(profile._id)
                              ? "Online"
                              : "Offline"}
                          </span>
                        </div>
                        {/* Show message count if not opened */}
                        {!openedChats.has(profile._id) &&
                          messageCounts.get(profile._id) > 0 && (
                            <div className="message-count mt-2">
                              <span className="text-muted">
                                Messages: {messageCounts.get(profile._id)}
                                {console.log(
                                  "message count",
                                  messageCounts.get(profile._id)
                                )}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="div mx-4 mt-4">
                <i className="ri-more-2-line"></i>
              </div>
            </div>
          ))}
        </div>
        {/* Right Section */}
        <div className="col-8 mx-5 create-message-section mt-4 position-fixed">
          <div className="h-100 w-100 mx-5 mt-4">
            <div className="text-center">
              <div className="empty-state">
                <span className="text-muted">Add new Friend</span>
              </div>
              <button
                className="btn btn-primary fw-bold mt-2"
                onClick={openMessagePopUp}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
