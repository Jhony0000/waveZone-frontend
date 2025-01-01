import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { getUserProfail } from "../../backend/userApi/apiService";
import { useSelector } from "react-redux";
import {
  getAllMessage,
  SelectedUserForChat,
} from "../../backend/messageApi/messageApi";
import { socket } from "../../socket/index.js";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { FaSpinner } from "react-icons/fa"; // Font Awesome spinner icon

function MessageSendOutLet() {
  const { id } = useParams();
  const ref = useRef(null);
  const [userProfail, setUserProfail] = useState({});
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const backtoMessagePage = useNavigate();
  const messageEndRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);

  let typingTimeout;

  useEffect(() => {
    ref.current.continuousStart();
    const selectedUserForChat = async () => {
      try {
        const response = await SelectedUserForChat({ partcipantUserID: id });
        setConversationId(response.data.data._id);
      } catch (error) {
        console.log("message send out let error , ", error);
      } finally {
        ref.current.complete();
      }
    };
    if (id) {
      selectedUserForChat();
    }
  }, [id, userData.data._id]);

  useEffect(() => {
    ref.current.continuousStart();
    // const getAllMessages = async () => {
    //   try {
    //     const response = await getAllMessage(conversationId);
    //     setMessages(response.data.data);
    //   } catch (error) {
    //     console.log("Error fetching messages:", error);
    //   } finally {
    //     ref.current.complete();
    //   }
    // };
    const getAllMessages = async () => {
      try {
        const response = await getAllMessage(conversationId);
        const normalizedMessages = response.data.data.map((msg) => ({
          ...msg,
          createId:
            typeof msg.createId === "object" ? msg.createId._id : msg.createId,
        }));
        setMessages(normalizedMessages);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };
    if (conversationId && userData) {
      getAllMessages();
    }
  }, [conversationId, userData]);

  useEffect(() => {
    if (conversationId) {
      socket.emit("joinRoom", conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    ref.current.continuousStart();
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Typing event
    socket.on("typing", (userId) => {
      if (userId !== userData.data._id) {
        setTypingUser(userId); // Set the typing user ID
      }
    });

    // Stop typing event
    socket.on("stopTyping", (userId) => {
      if (userId !== userData.data._id) {
        setTypingUser(null); // Reset typing user ID
      }
    });

    ref.current.complete();

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  const sendMessages = async () => {
    ref.current.continuousStart();
    try {
      if (message.trim()) {
        const newMessage = {
          chatId: conversationId,
          content: message,
          sendId: id,
          createId: userData.data._id,
        };

        socket.emit("sendMessage", { ...newMessage, sendId: id });
        setMessage("");
      }
    } catch (error) {
      console.log("send message error : ", error);
    } finally {
      ref.current.complete();
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      socket.emit("typing", conversationId, userData.data._id);
      setIsTyping(true);
    }

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", conversationId, userData.data._id);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    ref.current.continuousStart();
    const getUserProfails = async () => {
      try {
        const response = await getUserProfail({ id: id });
        setUserProfail(response.data.data);
      } catch (error) {
        console.log("messsage send outlet error , ", error);
      } finally {
        ref.current.complete();
      }
    };
    if (id) {
      getUserProfails();
    }
  }, [id]);
  useEffect(() => {
    if (conversationId && userData?.data?._id) {
      socket.emit("messageSeen", {
        chatId: conversationId,
        userId: userData.data._id,
      });
    }
  }, [conversationId, userData]);
  useEffect(() => {
    socket.on("messageSeenUpdate", (updatedMessages) => {
      setMessages(updatedMessages);
    });

    return () => {
      socket.off("messageSeenUpdate");
    };
  }, []);

  const groupMessagesByDate = () => {
    const grouped = {};
    messages.forEach((msg) => {
      const date = new Date(msg.createdAt);
      const dateKey = date.toDateString(); // Group by date
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(msg);
    });
    return grouped;
  };

  // Helper function to get label
  const getDateLabel = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    if ((today - date) / (1000 * 60 * 60 * 24) <= 7)
      return date.toLocaleDateString("en-US", { weekday: "long" });
    return date.toLocaleDateString();
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <div className="container-fluid message-send-page">
      <LoadingBar color="#f11946" ref={ref} />
      <div className="message-user-friend-section pt-3">
        <div className="position-fixed user-profail rounded-bottom w-75 send-message-section-user-profail">
          <div className="row user-profail-box  w-100">
            <div className="col-12  d-flex justify-content-between">
              <div className="div d-flex">
                <img
                  className="message-send-section-user-avatar"
                  src={`${userProfail.avatar}`}
                  alt="user-profail-photo..."
                />
                <div className="ful-name mt-2 mx-1">
                  <span className="fw-bold">{userProfail.FulName}</span>.
                </div>
                <div className="user-name mt-2">
                  <span className="text-light">{userProfail.userName}</span>
                </div>
              </div>
              <div
                className="back-button text-end mx-1"
                onClick={() => backtoMessagePage(-1)}
              >
                <i className="ri-arrow-left-line"></i>
              </div>
            </div>
          </div>
        </div>
        {userData.data._id !== id && (
          <div
            className="row mx-3 pt-5  user-message scrollable-div"
            style={{
              maxHeight: "70vh",
              overflowY: "auto",
              scrollBehavior: "smooth",
            }}
          >
            <div className="col-12">
              {Object.entries(groupedMessages).map(([date, messages]) => (
                <div key={date}>
                  {/* Date label */}
                  <div className="date-label text-center ">
                    <strong>{getDateLabel(date)}</strong>
                  </div>
                  {/* Messages for this date */}
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`row ${
                        msg.createId === userData.data._id
                          ? "user-message"
                          : "user-message text-start"
                      } mt-1`}
                    >
                      <div
                        className={`massage-user-box ${
                          msg.createId === userData.data._id
                            ? "d-block"
                            : "friend-messages-sectio box d-block"
                        }`}
                      >
                        <div className="content-message">
                          <div className="div">
                            <span
                              className={`friend-messages ${
                                msg.createId !== userData.data._id
                                  ? "text-start"
                                  : "user-message"
                              }`}
                            >
                              {msg.content}
                            </span>
                          </div>
                        </div>
                        <div className="div mt-1">
                          <span className="message-time mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <div ref={messageEndRef}></div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="typing-indicator" style={{ height: "30px" }}>
                {typingUser && typingUser !== userData.data._id && (
                  <div className="text-light">
                    <FaSpinner className="fa-spin" /> {/* Spinner icon */}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="row position-fixed w-100">
          <div className="col-12 d-flex justify-content-center message-input-box">
            {userData.data._id !== id && (
              <div className="div w-75">
                <input
                  type="text"
                  className="h-100 w-75 send-message-input"
                  placeholder="Start a new message"
                  onChange={handleTyping}
                  value={message}
                />
                <i
                  className="ri-send-plane-2-line message-send-btn"
                  onClick={sendMessages}
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageSendOutLet;
