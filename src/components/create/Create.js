import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
import CloudinaryUploadWidget from "../CloudinaryUpload";
import { UserContext } from "../../contexts/UserContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import "./Create.css";
import { BsEmojiLaughing, BsXLg } from "react-icons/bs";

const Create = () => {
  const [emojiModal, setEmojiModal] = useState(false);
  const { user } = useContext(UserContext);
  const {
    createPost,
    setCreatePostModal,
    setEditPost,
    editPost,
    editPostCall,
  } = useContext(PostContext);
  const [img, setImg] = useState("");
  const [postBody, setPostBody] = useState("");

  const addEmoji = (emoji) => {
    setPostBody(postBody ? postBody + String(emoji.native) : emoji.native);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!editPost._id) {
      if (img) {
        createPost({ postBody, img });
      } else if (postBody) {
        createPost({ postBody });
      }
    } else {
      if (img) {
        editPostCall({ postBody, img, postID: editPost._id });
      } else if (postBody) {
        editPostCall({ postBody, postID: editPost._id });
      }
    }
  };

  useEffect(() => {
    setPostBody(editPost.postBody);
    setImg(editPost.img);
  }, []);
  return (
    <div className="modal-wrapper">
      <div className="create-post modal">
        <img src={user.profilePicture} className="thumbnail-small" alt="dp" />
        <span className="user-tags">
          <b>{user.name}</b>
          <em>@{user.username}</em>
        </span>

        <button
          className="btn-close"
          onClick={
            editPost._id
              ? () => setEditPost({})
              : () => setCreatePostModal(false)
          }
        >
          <BsXLg size={"2rem"} />
        </button>
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="Whats on you mind?"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />

          <span className="media-buttons">
            <button type="button" className="emoji-button">
              <BsEmojiLaughing
                size={"1.5rem"}
                className="smile"
                onClick={() => setEmojiModal((prev) => !prev)}
              />
              {emojiModal && (
                <div className="emoji-mart">
                  <Picker data={data} onEmojiSelect={addEmoji} />
                </div>
              )}
            </button>
            {img ? (
              <button className="btn-warn" onClick={() => setImg("")}>
                Remove Image?
              </button>
            ) : (
              <CloudinaryUploadWidget id={"post"} setImg={setImg} />
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
            <span>{!editPost._id ? "Post" : "Update"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
