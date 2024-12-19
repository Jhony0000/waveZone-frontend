import React, { useEffect, useState } from "react";
import service from "../appwrite/Service";
import VideoCard from "../components/VideoCard";
import { NavLink } from "react-router-dom";
import PostNav from "../components/PostNav";

function Home() {
  const [loding, setLoding] = useState(true);
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   service.allPost().then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //     }
  //     setLoding(false);
  //   });
  // }, []);

  return (
    <div className="home-page">
      <PostNav />
      <div>
        <VideoCard />
      </div>
    </div>
  );
}

export default Home;
