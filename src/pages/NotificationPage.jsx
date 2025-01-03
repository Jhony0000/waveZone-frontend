import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getUserNotification } from "../backend/notification/notificationApi";
import { socket } from "../socket/index.js";
import LoadingBar from "react-top-loading-bar";
import DeletePopUp from "../components/popupComponents/DeletePopUp.jsx";

function NotificationPage() {
  const ref = useRef();
  const [isOPenDeletePopUp, setIsOpenDeletePopUP] = useState(false);
  const [notificationId, setNotificationId] = useState(null);
  const [notificationProfail, setNotificationProfail] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    ref.current.continuousStart();
    const getNotifications = async () => {
      try {
        const notifications = await getUserNotification(userData.data._id);
        setNotificationProfail(notifications.data.data);
        console.log("Fetched Notifications:", notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        ref.current.complete();
      }
    };

    if (userData.data._id) {
      getNotifications();
      socket.emit("joinRoom", userData.data._id); // Join user room
      console.log("Joining room:", userData.data._id);
    }

    socket.on("receiveNotification", (notification) => {
      console.log("New notification received:", notification);
      setNotificationProfail((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, [userData.data._id]);

  const OpenDeleteMessage = (id) => {
    setIsOpenDeletePopUP(true);
    setNotificationId(id);
  };

  const closeDeleteMessage = () => {
    setIsOpenDeletePopUP(false);
    setNotificationId(null);
  };

  return (
    <div className="container-fluid">
      <LoadingBar color="#f11946" ref={ref} />
      {isOPenDeletePopUp && (
        <DeletePopUp
          id={notificationId}
          className={`deletePopUP`}
          heading="Delete notification"
          onClose={closeDeleteMessage}
        />
      )}
      <div className="row">
        <div className="col-12 d-flex  justify-content-center">
          <div className="notification-page">
            <h6 className="fw-bold text-stert mt-2 px-2">Notification</h6>
            {notificationProfail.map((notification) => (
              <div
                className="notification pt-2 mt-3 notification-border d-flex justify-content-between "
                key={notification._id}
              >
                <div className="message-info d-flex">
                  <img
                    src={`${notification.owner?.avatar}`}
                    className=""
                    alt=""
                  />
                  {/* <i className="ri-video-line notification-video-icon"></i> */}
                  <span className="fw-bold mt-2">
                    {notification.owner?.FulName}
                  </span>
                  <span className="notification-message mx-2 mt-2">
                    {notification.message}
                  </span>
                </div>
                <div className="message-time-box">
                  <span className="time mt-3">
                    {new Date(notification.createdAt).toLocaleTimeString()} .{" "}
                    {notification.owner?.userName}
                  </span>
                </div>
                <div className="notification-more-icon">
                  <i
                    className="ri-more-2-fill mx-2 mt-2"
                    onClick={() => OpenDeleteMessage(notification._id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
