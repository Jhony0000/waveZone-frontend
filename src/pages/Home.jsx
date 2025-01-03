import React from "react";
import VideoCard from "../components/VideoCard";
import PostNav from "../components/PostNav";

function Home() {
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
