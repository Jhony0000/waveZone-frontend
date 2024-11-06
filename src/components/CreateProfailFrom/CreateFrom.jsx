import React from "react";
import { Input, Button } from "../index";
import { useForm } from "react-hook-form";
import Service from "../../appwrite/Service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function CreateProfail({ post }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  if (!userData) {
    console.error("User not authenticated");
    return;
  }
  const create = async (data) => {
    if (post) {
      const file = await Service.updataFile(data.coverphoto[0], userData);
      const files = await Service.updataFile(data.profailImg[0], userData);

      console.log("Cover photo ID:", file.$id);
      console.log("Profile photo ID:", files.$id);

      const dbPost = await Service.updateProfail({
        userImg: files.$id,
        userCoverImg: file.$id,
      });
      if (dbPost) {
        navigate("/profail");
      }
    } else {
      const file = await Service.uplodProfailPhotoFile(
        data.coverphoto[0],
        userData
      );
      const files = await Service.uplodProfailPhotoFile(
        data.profailImg[0],
        userData
      );

      if (file && files) {
        const fileID = file.$id;
        const filesID = files.$id;

        data.userImg = fileID;
        data.userCoverImg = filesID;

        const post = await Service.createProfail({
          ...data,
          userID: userData.$id,
          userName: userData.name,
        });
        if (post) {
          navigate("/profail");
        }
      }
    }
  };
  return (
    <>
      <div className="container-fluid border mt-5">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit(create)}>
              <label className="mt-3" htmlFor="">
                CoverPhoto
              </label>
              <Input
                type="file"
                className="w-100"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("coverphoto", {
                  required: true,
                })}
              />
              <label className="mt-3" htmlFor="">
                Profail img
              </label>
              <Input
                type="file"
                className="w-100"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("profailImg", {
                  required: true,
                })}
              />

              <Button className="mt-3 my-3 btn btn-success text-center">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProfail;
