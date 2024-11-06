import React, { useEffect, useState } from "react";
import Service from "../appwrite/Service";
import { useSelector } from "react-redux";
function AllFriends() {
  const [posts, setPosts] = useState([]);
  const [FriendPost, setFriendPost] = useState([]);
  // const [requestID, setRequestID] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData.$id);
  useEffect(() => {
    async function allFriend() {
      const data = await Service.showFriend(userData.$id);
      console.log("all friend", data);
      // setRequestID(data.documents.$id);
      setPosts(data.documents);
      try {
      } catch (error) {
        console.log("allFriend error", error);
      }
    }
    allFriend();
  }, [userData.$id]);

  useEffect(() => {
    async function allFriend() {
      const data = await Service.showFrindTo(userData.$id);
      console.log("frindTo all friend", data);
      // setRequestID(data.documents.$id);
      setFriendPost(data.documents);
      try {
      } catch (error) {
        console.log("allFriend error", error);
      }
    }
    allFriend();
  }, [userData.$id]);

  async function deleteFriend(requestId) {
    try {
      await Service.cancleFriendRequest(requestId);
      handleRefresh();
    } catch (error) {
      console.log("delete friend error", error);
    }
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="content">
      {posts && (
        <div>
          <div className="container-fluid w-100 pointer">
            <div className="row mt-5 ">
              {posts.map((posts) => (
                <div
                  className="col-12 w-100 mt-3 friend border align-items-center  w-100"
                  key={posts.$id}
                >
                  <div className="inf d-flex text-center  ">
                    <img
                      src={`${posts.profailImg}`}
                      alt="..."
                      className="profailimg"
                    />
                    <p className="mt-4 mx-4 ">{posts.userName}</p>
                    <button
                      className="btn btn-danger mt-4 mx-3  btn-frend"
                      onClick={() => deleteFriend(posts.$id)}
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
      )}
      {FriendPost && (
        <div>
          <div className="container-fluid w-100 pointer">
            <div className="row mt-5 ">
              {FriendPost.map((posts) => (
                <div
                  className="col-12 w-100 mt-3 friend border align-items-center  w-100"
                  key={posts.$id}
                >
                  <div className="inf d-flex text-center  ">
                    <img
                      src={`${posts.FriendProfailImg}`}
                      alt="..."
                      className="profailimg"
                    />
                    <p className="mt-4 mx-4 ">{posts.FriendName}</p>
                    <button
                      className="btn btn-danger mt-4 mx-3  btn-frend"
                      onClick={() => deleteFriend(posts.$id)}
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
      )}
    </div>
  );
}

export default AllFriends;
