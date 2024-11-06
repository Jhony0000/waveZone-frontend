import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../appwrite/Service";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Addfriend } from "../components/index";

function Profail() {
  const [profailImg, setProfailImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const { userID } = useParams();
  const [userName, setuserName] = useState("");
  const [isFriendRequest, setIsFriendRequest] = useState(false);
  const [requestId, setRequestId] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const [currentFrofailImg, setCurrentProfailImg] = useState("");
  const [currentName, setCurrentName] = useState("");

  useEffect(() => {
    async function fatchUserFromfail() {
      try {
        const userProfail = await Service.alluserinfo(userID);
        // ইউজার আইডি যাচাই করুন
        console.log("User Profile Data:", userProfail);

        if (userProfail.userCoverImg) {
          const ProfailImg = await Service.getFilePreviewProfailImg(
            userProfail.userImg
          );
          const CoverImg = await Service.getFilePreviewProfailImg(
            userProfail.userCoverImg
          );

          setProfailImg(ProfailImg);
          setCoverImg(CoverImg);
          setuserName(userProfail.userName);
        } else {
          console.log("Missing userImg or userCoverImg in profile data");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fatchUserFromfail();
  }, [userID]);

  useEffect(() => {
    async function fatchFromfail() {
      try {
        const userProfail = await Service.alluserinfo(userData.$id);
        // ইউজার আইডি যাচাই করুন
        console.log("User Profile Data:", userProfail);

        if (userProfail.userCoverImg) {
          const ProfailImg = await Service.getFilePreviewProfailImg(
            userProfail.userImg
          );
          const CoverImg = await Service.getFilePreviewProfailImg(
            userProfail.userCoverImg
          );

          setCurrentProfailImg(CoverImg);
          setCurrentName(userProfail.userName);
        } else {
          console.log("Missing userImg or userCoverImg in profile data");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fatchFromfail();
  }, [userData.$id]);

  useEffect(() => {
    async function chackedFriendRequest() {
      try {
        const friendRequest = await Service.chackedFriendRequest(
          userID,
          userData.$id
        );
        if (friendRequest.exists) {
          setIsFriendRequest(true);
          setRequestId(friendRequest.requestId);
        }
      } catch (error) {
        console.log("chacked friend request", error);
      }
    }

    chackedFriendRequest();
  }, [userID, userData.$id, requestId]);

  useEffect(() => {
    async function previewRequest() {
      try {
        const data = await Service.previewRequest(userData.$id, userID);
        if (data.documents.$id) {
          setIsFriendRequest(true);
        }
      } catch (error) {
        console.log("previewRequest error", error);
      }
    }
    previewRequest();
  }, [userID, userData.$id]);

  const sendRequest = async () => {
    try {
      const response = await Service.sendFriendRequest(
        userID,
        userData.$id,
        currentFrofailImg,
        currentName,
        userName,
        coverImg
      );
      setIsFriendRequest(true);
      setRequestId(response.$id);
      console.log("this is request id", response.$id);
    } catch (error) {
      console.log("add friend error", error);
    }
  };

  async function cancleRequest() {
    try {
      Service.cancleFriendRequest(requestId);
      setIsFriendRequest(false);
    } catch (error) {
      console.log("cancle request error", error);
    }
  }

  if (userID === userData) {
  } else {
    return (
      <div className="container-fluid border">
        <div className="row ">
          <div className="col-12 text-center">
            <div className="div Userprofail-img">
              <div className="div">
                {profailImg ? (
                  <img
                    src={profailImg}
                    className="w-100 coverPhoto"
                    alt="..."
                  />
                ) : (
                  <img
                    className="w-100 coverPhoto"
                    src="/Unknown cover-photo.jpg"
                    alt="..."
                  />
                )}
              </div>
              <div className=" d-flex justify-content-center">
                {coverImg ? (
                  <img src={coverImg} className="profailimg" alt="..." />
                ) : (
                  <img src="/rendom-img.png" alt="..." />
                )}
              </div>
              <div className="userNmae mt-3">
                {userName && (
                  <span className="text-center mt-3">{userName}</span>
                )}
              </div>
              <div className="btn mt-3">
                {isFriendRequest ? (
                  <button className="btn btn-success" onClick={cancleRequest}>
                    Cancle Friend Request
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={sendRequest}>
                    Add To Friend
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12mt-3"></div>
        </div>
      </div>
    );
  }
}

export default Profail;
