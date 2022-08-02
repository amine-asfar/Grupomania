import React, { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import "../../styles/post.css";
import axios from "axios";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";

function Post({
  username,
  timestamp,
  message,
  image,
  control,
  postId,
  usersLiked,
}) {
  console.log(new Date(timestamp))
  let storage = JSON.parse(localStorage.getItem("user"));
  let token = storage.token;
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    message: message,
    selectedFile: image,
    postId,
  });
  const [isLiked, setIsLiked] = useState(usersLiked.includes(storage.userId));
  const [likeCount, setLikeCount] = useState(usersLiked.length);
  //Set User Like

  const deletePost = async () => {
    try {
      const API = axios.create({ baseURL: "http://localhost:8080" });

      API.interceptors.request.use((req) => {
        req.headers.Authorization = `Bearer ${token}`;

        return req;
      });
      await API.delete(`/api/post/${postId}`);
      navigate(0);
    } catch (e) {
      console.log(e);
    }
  };
  const handleEdit = async () => {
    try {
      const API = axios.create({ baseURL: "http://localhost:8080" });

      API.interceptors.request.use((req) => {
        req.headers.Authorization = `Bearer ${token}`;

        return req;
      });
      await API.patch(`/api/post/${postId}`, postData);
      navigate(0);
    } catch (e) {
      console.log(e);
    }
  };
  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => {
      if (isLiked) return prev - 1;
      return prev + 1;
    });
    try {
      const API = axios.create({ baseURL: "http://localhost:8080" });

      API.interceptors.request.use((req) => {
        req.headers.Authorization = `Bearer ${token}`;

        return req;
      });
      await API.patch(`/api/post/${postId}/like`, postData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
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
                    value={postData.message}
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card" style={{ maxWidth: "550px" }}>
        <img className="card-img-top" src={image} alt="post" />
        <div className="card-body">
          <h5 className="card-title">{username}</h5>
          <p className="card-text">{message}</p>
          <p className="card-text">
            <small className="text-muted">{timestamp}</small>
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between flex-wrap">
          <button
            className="btn btn-primary btn-with-icon"
            onClick={handleLike}
          >
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
            <span>Like {likeCount > 0 ? `(${likeCount})` : null}</span>
          </button>
          {control ? (
            <div className="control-keys d-flex gap-1">
              <button
                className="btn btn-danger btn-with-icon"
                onClick={deletePost}
              >
                <FaTrashAlt />
                <span>Delete</span>
              </button>
              <button
                className="btn btn-success btn-with-icon"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                type="button"
              >
                <FiEdit />
                <span>Edit</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Post;
