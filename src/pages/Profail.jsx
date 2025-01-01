import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  NavLink,
} from "react-router-dom";
import { useSelector } from "react-redux";
import EditeProfailPopUp from "../components/popupComponents/EditeProfailPopUp";
import { deleteAccoutn, getUserProfail } from "../backend/userApi/apiService";
import { socket } from "../socket";
import { deleteUserAllVideo } from "../backend/videoApi/videoApi";
import LoadingBar from "react-top-loading-bar";

import { format } from "date-fns";

function Profail() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  console.log("userId", userData.data._id);
  const [getUserProfaill, setGetUserProfail] = useState({});
  const [isopentEaditeProfailPopUp, setIsOpenEaditeProfailPopUp] =
    useState(false);

  useEffect(() => {
    ref.current.continuousStart();
    const getProfail = async () => {
      try {
        const response = await getUserProfail({
          id: id,
          loggedInUserId: userData.data._id,
        });
        setGetUserProfail(response.data.data);
      } catch (error) {
        console.log("Error fetching profile", error);
      } finally {
        ref.current.complete(); // Complete the loading bar
      }
    };
    if (id) getProfail();
  }, [id, userData.data._id]);

  const DeleteAccount = async () => {
    await deleteUserAllVideo(userData.data._id);
    await deleteAccoutn();
    navigate("/login");
  };
  useEffect(() => {
    if (userData.data._id) {
      socket.emit("joinRoom", userData.data._id);
    }
  }, [userData.data._id]);

  useEffect(() => {
    const handleFollowStatusChange = (data) => {
      if (data.followingId === id) {
        setGetUserProfail((prev) => ({
          ...prev,
          isFollowers: data.isFollowers,
          followersCount: data.followersCount,
        }));
      }
    };

    socket.on("followStatusChanged", handleFollowStatusChange);

    return () => {
      socket.off("followStatusChanged", handleFollowStatusChange);
    };
  }, [id]);

  useEffect(() => {
    setGetUserProfail({}); // Reset the state
  }, [id]);

  // const followUser = useCallback(() => {
  //   socket.emit("toggleFollow", {
  //     followerId: userData.data._id,
  //     followingId: id,
  //   });
  // }, [id, userData.data._id]);

  const followUser = useCallback(() => {
    // Emit toggleFollow event with correct parameters
    socket.emit("toggleFollow", {
      followerId: userData.data._id,
      followingId: id,
    });

    // Update the UI based on the follow/unfollow action
    setGetUserProfail((prev) => ({
      ...prev,
      isFollowers: !prev.isFollowers, // Toggle the follow state
      followersCount: prev.isFollowers
        ? prev.followersCount - 1 // Decrease followers if unfollowed
        : prev.followersCount + 1, // Increase followers if followed
    }));
  }, [id, userData.data._id]);

  console.log("follow user----", getUserProfaill);
  return (
    <div className="profail-page">
      <LoadingBar color="#f11946" ref={ref} />
      {isopentEaditeProfailPopUp && (
        <EditeProfailPopUp onClose={() => setIsOpenEaditeProfailPopUp(false)} />
      )}
      {/* Cover Photo */}
      <div className="Userprofail-img">
        {getUserProfaill.coverImg && (
          <img
            src={getUserProfaill.coverImg}
            alt="Cover"
            className="user-cover-photo"
          />
        )}
      </div>

      {/* User Info */}
      <div className="row mx-4 user-section">
        <div className="col-12 d-flex  user-deteles-section d-flex justify-content-between">
          <div className="user-detels d-flex">
            <img
              className="user-profail-img"
              src={getUserProfaill.avatar}
              alt="Avatar"
            />
            <div className="div user-name-section mt-4">
              <div className="ful-namee">
                <h6 className="fw-bold ">{getUserProfaill.FulName}</h6>
              </div>

              <div className="user-namee ">
                <span>@{getUserProfaill.userName}</span>
              </div>
            </div>

            {/* </div> */}
          </div>

          <div className="div user-profail-edit-delete-btn-section px-3">
            {id === userData.data._id && (
              <div className="edite-profailt-btnn ">
                <button onClick={() => setIsOpenEaditeProfailPopUp(true)}>
                  Edit Profile
                </button>
                <button className="delete-account" onClick={DeleteAccount}>
                  Delete Account
                </button>
              </div>
            )}
            {id !== userData.data._id && (
              <button
                className={`btn w-25 ${
                  getUserProfaill.isFollowers ? "btn-danger" : "btn-success"
                }`}
                onClick={followUser}
              >
                {getUserProfaill.isFollowers ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>

        <div className="flowers d-flex">
          <Link>{getUserProfaill.followersCount} Followers</Link>
          <Link className="mx-4">
            {getUserProfaill.followingCount} Following
          </Link>
        </div>
        <div className="date px-3">
          <span>
            {getUserProfaill.createdAt
              ? format(new Date(getUserProfaill.createdAt), "dd-MMM-yyyy")
              : "Date not available"}
          </span>
        </div>
        <div className="btn">
          {id === userData.data._id && (
            <div className="edite-profailt-btnn ">
              <Link to="/uplod-video">
                {" "}
                <button>Video</button>
              </Link>
              <Link to="/uplod-blog">
                <button className="delete-account">Blog</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="row  mt-5 d-flex mx-3">
        <div className="div ">
          <NavLink to={`/profail/${id}`} className="" end>
            Videos
          </NavLink>
        </div>
        <div className="div blog-page-btn mx-5">
          <NavLink to={`profail/blog/${id}`} className="mx-5 ">
            Blogs
          </NavLink>
        </div>
      </div>

      <div className="border-profaile-page"></div>
      <Outlet />
    </div>
  );
}

export default Profail;
