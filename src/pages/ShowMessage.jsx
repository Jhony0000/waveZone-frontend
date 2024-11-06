import React, { useEffect, useState } from "react";
import Service from "../appwrite/Service";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Client } from "appwrite";

function ShowMessage() {
  const { register, handleSubmit } = useForm();
  const userData = useSelector((state) => state.auth.userData);
  const { ID } = useParams();
  const [Usermessage, setUserMessage] = useState([]);
  const [friendMessage, setFriendMessage] = useState([]);
  const [userProfail, setUserProfail] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [friendID, setFriendID] = useState("");
  const [FriendProfailImg, setFriendProfailImg] = useState("");
  const [FriendName, setFriendNmae] = useState("");
  console.log("userID", userData.$id);

  async function sendMessages(data) {
    try {
      const response = await Service.sendMessage({
        userMessage: data.message,
        sendID: userData.$id,
        ReciveID: userData.$id === userID ? friendID : userID,
      });
      handleRefresh();
    } catch (error) {
      console.log("send message page error", error);
    }
  }
  console.log("users ID", userID);
  console.log("friend id", friendID);
  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const profailImg = async () => {
      try {
        const response = await Service.messageProfail(ID);
        console.log("response profail", response);
        setUserProfail(response.profailImg);
        setUserName(response.userName);
        setFriendProfailImg(response.FriendProfailImg);
        setFriendNmae(response.FriendName);
        setFriendID(response.FrendID);
        setUserID(response.userID);
      } catch (error) {
        console.log("profail img error", error);
      }
    };
    profailImg();
  }, [ID]);

  useEffect(() => {
    const Allmessage = async () => {
      try {
        const message = await Service.allMessage({
          sendID: userData.$id,
          ReciveID: userData.$id === userID ? friendID : userID,
        });
        console.log("message", message);
        setUserMessage(message.documents);
      } catch (error) {
        console.log("All message error", error);
      }
    };
    Allmessage();
  }, [userID, friendID, userData.$id]);

  useEffect(() => {
    const Allmessage = async () => {
      try {
        const message = await Service.allMessage({
          sendID: userData.$id,
          ReciveID: userData.$id === userID ? friendID : userID,
        });
        console.log("message", message);
        setFriendMessage(message.documents);
      } catch (error) {
        console.log("All message error", error);
      }
    };
    Allmessage();
  }, [userID, friendID, userData.$id]);

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-12 col-md-12 col-12 d-flex">
          <div className="div  d-flex w-100 message-profail">
            {userID === userData.$id ? (
              <div className="img message-profail d-flex">
                <img src={userProfail} alt="..." />
                <div className="name mx-3 mt-2 message-profail">{userName}</div>
              </div>
            ) : (
              <div className="img message-profail d-flex">
                <img src={FriendProfailImg} alt="..." />
                <div className="name mx-3 mt-2 message-profail">
                  {FriendName}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row mt-5  w-25">
        <div className="col-12 mx-3 text-start mx-3">
          {friendMessage.map((message, index) => (
            <div key={index} className={`message`}>
              {message.userMessage}
            </div>
          ))}
        </div>
      </div>

      <div className="row mt-4 flex-row-reverse">
        <div className="col-12 w-25 text-end">
          {Usermessage.map((message, index) => (
            <div key={index} className={`message`}>
              {message.userMessage}
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        <form onSubmit={handleSubmit(sendMessages)}>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-5 d-flex d-flex justify-content-center ">
            <div className="input showmessage-input w-100  mx-3">
              <input
                type="text"
                placeholder="send message"
                className="w-100  "
                {...register("message", {
                  required: true,
                })}
              />
            </div>
            <div className="btn send-box">
              <button className="btn btn-success ">send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShowMessage;
