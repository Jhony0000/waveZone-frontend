import React, { useState } from "react";
import { Input, Button } from "../index";
import Service from "../../appwrite/Service";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function PostFrom() {
  const [userName, setUserName] = useState("");
  const [userProfailImg, setUserProfailImg] = useState("");
  const naviget = useNavigate();
  const { register, handleSubmit } = useForm();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    async function fatchUserFromfail() {
      try {
        const userProfail = await Service.alluserinfo(userData.$id);
        // ইউজার আইডি যাচাই করুন
        console.log("User Profile Data:", userProfail);
        const profileImgId = userProfail.userCoverImg;
        console.log("profailImgID", profileImgId);
        if (userProfail.userCoverImg) {
          const ProfailImg = await Service.getFilePreviewProfailImg(
            profileImgId
          );

          setUserProfailImg(ProfailImg);
          setUserName(userProfail.userName);
        } else {
          console.log("Missing userImg or userCoverImg in profile data");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fatchUserFromfail();
  }, [userData]);

  const createPost = async (data) => {
    const file = await Service.uplodPostFile(data.img[0]);

    if (file) {
      const fileID = file.$id;
      data.media = fileID;

      const post = await Service.createPost({
        ...data,
        userID: userData.$id,
        userName: userName,
        profailImg: userProfailImg,
      });
      if (post) {
        naviget("/");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(createPost)} className="mt-5 ">
        <textarea
          type="text"
          className="w-100  teaxt-erea"
          placeholder="Write some text..."
          {...register("content", {
            required: true,
          })}
        />
        <Input
          type="file"
          className="mt-3 w-100"
          {...register("img", {
            required: true,
          })}
        />

        <Button className="btn btn-success mt-3 my-3 text-center">
          Submit
        </Button>
      </form>
    </>
  );
}

export default PostFrom;
