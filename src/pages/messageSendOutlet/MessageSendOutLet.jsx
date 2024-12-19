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

  useEffect(() => {
    if (conversationId) {
      socket.emit("joinRoom", conversationId); // Join the room based on conversationId
    }
  }, [conversationId]);

  useEffect(() => {
    ref.current.continuousStart();
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    ref.current.complete();
    // Cleanup function to remove the listener when the component unmounts or conversationId changes
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

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

  // Fetch messages for the conversation
  useEffect(() => {
    ref.current.continuousStart();
    if (conversationId && userData) {
      const getAllMessages = async () => {
        try {
          const response = await getAllMessage(conversationId);
          setMessages(response.data.data); // Set fetched messages to state
          console.log("Fetched Messages:", response.data.data);
        } catch (error) {
          console.log("Error fetching messages:", error);
        } finally {
          ref.current.complete();
        }
      };
      getAllMessages();
    }
  }, [conversationId, userData]); // Ensure the messages are fetched after the conversationId and userData are available

  console.log("User ID:", userData.data._id);
  console.log("Messages:", messages);
  // Send a new message
  const sendMessages = async () => {
    ref.current.continuousStart();
    try {
      if (message.trim()) {
        const newMessage = {
          chatId: conversationId, // Conversation ID
          content: message, // Message content
          sendId: id, // Sender's ID
          createId: userData.data._id, // Creator's ID
        };

        // setMessages((prevMessages) => [...prevMessages, newMessage]);
        // Emit the message to the server (which should broadcast it to the room)
        socket.emit("sendMessage", {
          ...newMessage,
          sendId: id,
        });

        // Optimistically update the UI with the new message
        // setMessages((prevMessages) => [...prevMessages, newMessage]);

        setMessage(""); // Clear input field
      }
    } catch (error) {
      console.log("send message error : ", error);
    } finally {
      ref.current.complete();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch selected user profile
  useEffect(() => {
    ref.current.continuousStart();
    const getUserProfails = async () => {
      try {
        const respose = await getUserProfail(id);
        setUserProfail(respose.data.data);
        console.log(respose);
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

  return (
    <div className="container-fluid message-send-page">
      <LoadingBar color="#f11946" ref={ref} />
      <div className="message-user-friend-section pt-3">
        <div className="position-fixed user-profail rounded-bottom w-75 send-message-section-user-profail  ">
          <div className="row user-profail-box  w-100">
            <div className="col-12  d-flex justify-content-between ">
              <div className="div d-flex ">
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

          {/* <div className="row">
            <div className="col-12 text-center">
              <span className="text-muted fw-bold">
                {userProfail.followersCount}
              </span>
              <span className="text-muted mx-1 fw-bold">Followers</span>
            </div>
          </div> */}
        </div>

        <div className="row mx-3 pt-5  user-message scrollable-div">
          <div className="col-12">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`row  ${
                  msg.createId._id === userData.data._id
                    ? "user-message  "
                    : "friend-messages-section text-start"
                } mt-1`}
              >
                <div
                  className={`massage-user-box ${
                    msg.createId._id === userData.data._id
                      ? "d-block"
                      : "friend-messages-sectio box d-block"
                  }`}
                >
                  <div className="content-message">
                    <div className="div ">
                      <span
                        className={`friend-messages  ${
                          msg.createId !== userData.data._id
                            ? "text-start"
                            : "user-message text-end"
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
              </div>
            ))}

            <div ref={messageEndRef}></div>
          </div>
        </div>
        <div className="row position-fixed w-100">
          <div className="col-12  d-flex justify-content-center  message-input-box">
            {userData.data._id !== id && (
              <div className="div w-75">
                <input
                  type="text"
                  className="h-100 w-75 send-message-input"
                  placeholder="Start a new message"
                  onChange={(e) => setMessage(e.target.value)}
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
