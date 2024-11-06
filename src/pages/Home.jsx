import React, { useEffect, useState } from "react";
import service from "../appwrite/Service";
import { PostCard } from "../components/index";
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <PostNav />
        </div>
      </div>
    </div>
  );
}

export default Home;
