import React, { useState, useEffect } from "react";
import Service from "../appwrite/Service";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Message() {
  const [posts, setPosts] = useState([]);
  const [userID, setUserID] = useState("");
  const [friend, setFriend] = useState("");
  const [ID, setID] = useState("");

  // const [requestID, setRequestID] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    async function allFriend() {
      const data = await Service.showFriend(userData.$id);

      console.log("all friend", data);
      // setRequestID(data.documents.$id);
      setPosts(data.documents);
      setUserID(data.documents.userID);
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
      setFriend(data.documents);
      setID(data.documents.$id);
      try {
      } catch (error) {
        console.log("allFriend error", error);
      }
    }
    allFriend();
  }, [userData.$id]);
  console.log("userID", userID);
  console.log("ID", ID);
  return (
    <div>
      {posts && (
        <div className="container-fluid w-100 pointer">
          <div className="row mt-5 ">
            {posts.map((posts) => (
              <Link to={`/message/${posts.$id}`}>
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {friend && (
            <div className="row mt-3">
              {friend.map((posts) => (
                <Link to={`/message/${posts.$id}`}>
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Message;
