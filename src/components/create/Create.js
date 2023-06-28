import React, { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
import CloudinaryUploadWidget from "../CloudinaryUpload";
import { UserContext } from "../../contexts/UserContext";

import "./Create.css";
import { BsEmojiLaughing, BsXLg } from "react-icons/bs";

const Create = () => {
  const { user } = useContext(UserContext);
  const { createPost, setCreatePostModal } = useContext(PostContext);
  const [img, setImg] = useState("");
  const [imgName, setImgName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const postBody = event.target[0].value;
    if (img) {
      createPost({ postBody, img });
    } else {
      createPost({ postBody });
    }
  };
  return (
    <div className="modal-wrapper">
      <div className="create-post modal">
        <img src={user.profilePicture} className="thumbnail-small" />
        <span className="user-tags">
          <b>{user.name}</b>
          <em>@{user.username}</em>
        </span>

        <button className="btn-close" onClick={() => setCreatePostModal(false)}>
          <BsXLg size={"2rem"} />
        </button>
        <form onSubmit={handleSubmit}>
          <textarea type="text" placeholder="Whats on you mind?" />

          <span className="media-buttons">
            <button>
              <BsEmojiLaughing size={"1.5rem"} className="smile" />
            </button>
            {img ? (
              <button className="btn-warn" onClick={() => setImg("")}>
                Remove Image?
              </button>
            ) : (
              <CloudinaryUploadWidget setImg={setImg} />
            )}
          </span>
          <button type="submit" className="btn-post">
            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Post</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
