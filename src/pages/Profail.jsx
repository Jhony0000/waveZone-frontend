import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "../appwrite/Service";
import { useSelector } from "react-redux";

function Profail() {
  const [profailImg, setProfailImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [userName, setuserName] = useState();
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);

  useEffect(() => {
    async function fatchUserFromfail() {
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
  }, [userData.$id]);

  useEffect(() => {
    async function allFriend() {
      const data = await Service.showFriend(userData.$id);
      console.log("all friend", data);
      setPosts(data.documents);

      try {
      } catch (error) {
        console.log("allFriend error", error);
      }
    }
    allFriend();
  }, [userData.$id]);

  useEffect(() => {
    async function allFriendTo() {
      const data = await Service.showFrindTo(userData.$id);
      console.log("all friend", data);
      setPosts(data.documents);

      try {
      } catch (error) {
        console.log("allFriend error", error);
      }
    }
    allFriendTo();
  }, [userData.$id]);

  return (
    <div className="container-fluid border">
      <div className="row ">
        <div className="col-12 text-center">
          <div className="div Userprofail-img">
            <div className="div">
              {profailImg ? (
                <img src={profailImg} className="w-100 coverPhoto" alt="..." />
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
              {userName && <span className="text-center mt-3">{userName}</span>}
            </div>
            <div className="userBtn mt-3">
              {!coverImg ? (
                <Link to="/profail/createprofail">
                  <button className="btn btn-success mt-3">
                    CreateProfail
                  </button>
                </Link>
              ) : null}
            </div>
            <div className="userEditebtn">
              {coverImg && (
                <Link to="/profail/Eadite">
                  <button className="btn btn-success mx-4">
                    EaditeProfail
                  </button>
                </Link>
              )}
            </div>
            {posts.length > 0 ? (
              <Link to="allfriends">
                {" "}
                <div className="btn btn-success mt-4">All Friends</div>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12mt-3"></div>
      </div>
    </div>
  );
}

export default Profail;
