import React, { useEffect, useState, useContext } from "react";
import "../../styles/PostsPage.css";
import Header from "./Header";
import CreatePost from "./CreatePost";
import Post from "./Post";

import { useNavigate } from "react-router-dom";
import { userAuthContext } from "../../ContextAPI/isAuth";
import Loader from "../Loader/Loader";

function PostsPage() {
  let offset = 0;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isAuth] = useContext(userAuthContext);
  
  let storage = "",
    token = "";
  if (isAuth) {
    storage = JSON.parse(localStorage.getItem("user"));
    token = storage?.token;
  }

  async function getPosts() {
    setIsLoading(null);
    try {
      const data = await fetch(`http://localhost:8080/api/post/${offset}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const posts = await data.json();
      setIsLoading(false);
      if (data) {
        setPosts((prevPosts) => {
          return [...prevPosts, ...posts];
          //return [...new Set(all)];
        });
      }
      offset += 10;
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }
  function handleScroll(e) {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      getPosts();
    }
  }
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    getPosts();
    window.addEventListener("scroll", handleScroll);
  }, [isAuth, navigate, token]);

  return (
    <div>
      <Header />
      <div className="postpage_body">
        <CreatePost />
        <div className="container d-flex align-items-center flex-column gap-3">
          {posts.length > 0
            ? posts.map((post, index) => (
                <Post
                  key={index}
                  message={post.message}
                  username={post.creator}
                  timestamp={`${post.createdAt
                  }`}
                  image={post.selectedFile}
                  control={post.userId === storage.userId || storage?.isAdmin}
                  postId={post._id}
                  
                  
                  usersLiked={post.usersLiked}
                />
              ))
            : null}
          <div
            className=" p-5 d-flex justify-content-center"
            style={{ height: "30px" }}
          >
            {isLoading ?? <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsPage;
