import React, { useEffect, useState } from "react";
import Service from "../appwrite/Service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Friend() {
  const userData = useSelector((state) => state.auth.userData);
  // const [requestID, setRequestID] = useState("");
  const [posts, setPosts] = useState([]);
  // const [friendID, setFriendID] = useState("");
  const naviget = useNavigate();
  console.log("user ID", userData.$id);
  useEffect(() => {
    async function allFriends() {
      const response = await Service.allFriendRequest(userData.$id);

      console.log("friends", response.documents);
      setPosts(response.documents);
      // setFriendID(response.documents.FrendID);
      // setRequestID(response.documents[0].FrendID);
    }
    allFriends();
  }, [userData.$id]);
  // console.log("freind id", requestID);
  async function confirmRequest(requestID) {
    try {
      await Service.accpitFrindRequest(requestID);
      handleRefresh();
    } catch (error) {
      console.log("confirm request error", error);
    }
  }

  async function deleteFriendRequest(requestID) {
    try {
      await Service.cancleFriendRequest(requestID);
      naviget("/profail");
    } catch (error) {
      console.log("deleteFriend Request error", error);
    }
  }

  const handleRefresh = () => {
    window.location.reload();
  };
  // console.log("frend id", friendID);

  return (
    <div>
      <div className="container-fluid text-end  w-100">
        <div className="row mt-5 ">
          {posts.map((posts) => (
            <div
              className="col-12 w-100 mt-3 friend border align-items-center  w-100"
              key={posts.$id}
            >
              <div className="inf d-flex ">
                <img
                  src={`${posts.profailImg}`}
                  alt="..."
                  className="profailimg"
                />
                <p className="mt-4 mx-3">{posts.userName}</p>
                <button
                  className="btn btn-success mt-4 mx-3 btn-frend"
                  onClick={() => confirmRequest(posts.$id)}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-danger mt-4 mx-3  btn-frend"
                  onClick={() => deleteFriendRequest(posts.$id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Friend;
