import React, { useEffect, useState, useRef } from "react";
import { getBlogMixFeed } from "../../backend/blogApi/blogApi";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { updateBlogView } from "../../backend/blogApi/blogApi.js"; // API call to update views
import CommentPopup from "../popupComponents/CommentPopup.jsx";
import { socket } from "../../socket/index.js";
import LoadingBar from "react-top-loading-bar";

function BlogCard() {
  const [isExplaned, setIsexplaned] = useState(false);
  const [blogContent, setBlogContent] = useState(
    "hello , my name is jony i am 17 . i am read in class 12th . my village in motlob uttar chandpur"
  );
  const [BlogFeed, setBlogFeed] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(null);
  const ref = useRef(null);
  const [blogLikes, setBlogLikes] = useState({});
  const [blogId, setBlogId] = useState(null);
  const [isOpenCommentPopUp, setIsOpenCommentPopUp] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  const blogRef = useRef([]); // Reference to each blog card

  const [viewedBlogs, setViewedBlogs] = useState(
    JSON.parse(localStorage.getItem("viewedBlogs")) || [] // Fetch viewed blogs from localStorage
  );

  const openCommentPopUp = (blogId) => {
    setIsOpenCommentPopUp(true);
    setBlogId(blogId);
  };

  const closeCommentPopUp = () => {
    setIsOpenCommentPopUp(false);
  };

  useEffect(() => {
    // Listen for real-time like updates
    socket.on("likeUpdate", ({ postId, likeCount, likedBy }) => {
      setBlogFeed((prevBlog) =>
        prevBlog.map((blog) =>
          blog._id === postId
            ? {
                ...blog,
                likeCount,
                isLiked: likedBy.includes(userData.data?._id),
              }
            : blog
        )
      );
    });

    return () => {
      socket.off("likeUpdate");
    };
  }, [userData]);

  const handelLike = (blogId) => {
    const userId = userData.data?._id;

    // Emit the like event to the server
    socket.emit("like", { userId, postId: blogId });
    setBlogFeed((prevBlog) =>
      prevBlog.map((blog) =>
        blog._id === blogId
          ? {
              ...blog,
              isLiked: !blog.isLiked,
              likeCount: blog.isLiked ? blog.likeCount - 1 : blog.likeCount + 1,
            }
          : blog
      )
    );
  };

  const toggoleContent = () => {
    setIsexplaned(!isExplaned);
  };

  const displayedContent = isExplaned
    ? blogContent
    : blogContent.split(" ").slice(0, 20).join(" ") + " .";

  useEffect(() => {
    const getBlogFeed = async () => {
      ref.current.continuousStart();
      try {
        const response = await getBlogMixFeed(userData.data._id);
        const fetchedBlogs = response.data.data.data?.map((blog) => ({
          ...blog,
          isLiked: (blog.likedBy || []).includes(userData.data._id),
        }));

        setBlogFeed(fetchedBlogs);
        console.log("blog feed", response);
      } catch (error) {
        console.log("get blog feed page error : ", error);
      } finally {
        ref.current.complete();
      }
    };
    if (userData.data?._id) {
      getBlogFeed();
    }
  }, []);
  // Setting up IntersectionObserver to track visibility of blog cards

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Intersection entries:", entries); // Log for debugging
        entries.forEach((entry) => {
          const blogId = entry.target.getAttribute("data-id");
          console.log(
            "Blog ID:",
            blogId,
            "Is intersecting:",
            entry.isIntersecting
          );

          if (entry.isIntersecting && blogId && !viewedBlogs.includes(blogId)) {
            const timer = setTimeout(() => {
              updateViewCount(blogId); // Call the API after 3 seconds
            }, 3000);

            // Store the timer ID to clear if needed
            entry.target.dataset.timerId = timer;
          } else {
            // Clear the timer if the blog is no longer visible
            if (entry.target.dataset.timerId) {
              clearTimeout(entry.target.dataset.timerId);
              delete entry.target.dataset.timerId; // Remove the stored timer ID
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when at least 50% of the blog card is visible
    );

    blogRef.current.forEach((blog) => observer.observe(blog));

    return () => {
      observer.disconnect();
    };
  }, [BlogFeed, viewedBlogs]);

  const updateViewCount = async (blogId) => {
    try {
      // Update local storage immediately
      setViewedBlogs((prevViewedBlogs) => {
        const updatedViewedBlogs = Array.from(
          new Set([...prevViewedBlogs, blogId])
        );
        localStorage.setItem("viewedBlogs", JSON.stringify(updatedViewedBlogs));
        return updatedViewedBlogs;
      });

      // Make the API call to increment the view count
      await updateBlogView(blogId);
      console.log("blogID", blogId);
    } catch (error) {
      console.log("Error updating view count", error);
    }
  };

  return (
    <div className="div post-blog-card">
      <LoadingBar color="#f11946" ref={ref} />
      {isOpenCommentPopUp && (
        <CommentPopup
          postId={blogId}
          onClose={closeCommentPopUp}
          userId={userData.data._id}
        />
      )}
      {BlogFeed?.map((blog, index) => (
        <div
          key={blog._id}
          ref={(el) => (blogRef.current[index] = el)} // Assign ref to each blog card
          data-id={blog._id} // Add blog ID for use in the observer callback
          className="container-fluid blog-card my-3"
        >
          <div className="row blog-card-content ">
            <div className="col-12 d-flex justify-content-between mt-1">
              <div className="users-profail-img d-flex w-100">
                <Link to={`/profail/${blog.owner?._id}`} className="d-flex">
                  <img
                    src={`${blog.owner ? blog.owner.avatar : "rendom-img.png"}`}
                    alt=""
                  />
                  <div className="ful-name-div">
                    <span className="full-name  mx-1 ">
                      {blog.owner ? blog.owner.FulName : null}
                      xcxcczxzxzxzcxcxzczcxzczczxzcczczzxczxxzxzcxzczcxzxzxzxzxzxzxzxzxzxzxzxzxzxz
                    </span>
                  </div>
                </Link>
              </div>
              <div className="more-icon">
                <i className="ri-more-2-fill"></i>
              </div>
            </div>
            <div className="uplod-time mt-1">
              <span className="">
                {formatDistanceToNow(new Date(blog.createdAt))}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-4 mx-3">
              <div className="title text-start blog-content ">
                <h5>
                  {blog.title}
                  dfjhgsdjhfgsdjfgsdhjfgsdhjfgsjhdfghjsdfghsjdfgjhsdfghsjdgfhjsdgfhjsdfghjsdgfjhsdfgjhsdfgsjhdfghsdfghsdfghjsdfgsjdgfhsdgfhsdfgshjdfghjsdfghsjdfgshjdfghsdfghjsdgfhsjdfghsdgfhsdgfhsdfg{" "}
                </h5>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-3 mx-3 ">
              <div className="contents blog-content">
                <span>{blog.content} dgvdsgdfgfdgdfgdfgdf</span>
                <a onClick={toggoleContent} className="mx-3 text-primary">
                  {isExplaned ? "See Less..." : "See More..."}
                </a>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 d-flex justify-content-center">
              <div className="content-img">
                <img src={`${blog.Image ? blog.Image : null}`} alt="" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-around mt-4 py-3">
              <div className="like" onClick={() => handelLike(blog._id)}>
                {blogLikes[blog._id]?.isLiked ? "❤️" : "🤍"}
                {blogLikes[blog._id]?.count || blog.likeCount}
              </div>
              <div className="coments">
                <i
                  className="ri-chat-1-line"
                  onClick={() => openCommentPopUp(blog._id)}
                >
                  {blog.commentsCount}
                </i>
              </div>
              <div className="views">
                <i className="ri-eye-line">{blog.Views}</i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogCard;
