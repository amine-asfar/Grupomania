import React, { useState, useContext } from "react";
import "../../styles/CreatePost.css";
import FileBase from "react-file-base64";
import axios from "axios";
import Loader from "../Loader/Loader";
import { userAuthContext } from "../../ContextAPI/isAuth";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  let storage = "",
    token = "";
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isAuth] = useContext(userAuthContext);

  if (isAuth) {
    storage = JSON.parse(localStorage.getItem("user"));
    token = storage?.token;
  }
  
  const [postData, setPostData] = useState({
    message: "",
    selectedFile: "",
    creator: storage?.userName,
    createdAt:new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"})
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Posting Post
    setIsLoading(null);
    const API = axios.create({ baseURL: "http://localhost:8080" });

    API.interceptors.request.use((req) => {
      req.headers.Authorization = `Bearer ${token}`;

      return req;
    });
    try {
      await API.post("/api/post/", postData);
      setIsLoading(false);
      navigate(0);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div
      className="createpost container"
      style={{ maxWidth: "550px", padding: "0" }}
    >
      <form onSubmit={handleSubmit} className="rounded shadow-sm">
        <div className="mb-3">
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="message"
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            placeholder="whats in your mind"
          ></textarea>
        </div>
        <div className="mb-3">
          <FileBase
            id="formFile"
            className="form-control"
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setPostData({ ...postData, selectedFile: base64 });
            }}
          />
        </div>

        <button className="btn btn-primary btn-load">
          <span>Share</span>
          {isLoading ?? <Loader />}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
