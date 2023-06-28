import React from "react";
import "./Buttons.css";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

const CreateButton = () => {
  const { setCreatePostModal } = useContext(PostContext);

  return (
    <button
      type="button"
      className="btn-create"
      onClick={() => setCreatePostModal(true)}
    >
      <span className="tooltip-left">Create Post</span>
    </button>
  );
};

export default CreateButton;
