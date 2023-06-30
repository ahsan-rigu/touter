import React, { useContext, useState } from "react";
import "./PostCard.css";
import { Link, useNavigate } from "react-router-dom";
import {
  BsBookmarkDash,
  BsBookmarkPlus,
  BsHeart,
  BsPencil,
  BsTrash,
  BsXLg,
} from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { BiCommentAdd } from "react-icons/bi";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { UserContext } from "../../contexts/UserContext";
import { PostContext } from "../../contexts/PostContext";

const PostCard = ({
  post: { img, userID, postBody, likes, _id, comments },
  post,
  fetchPosts,
}) => {
  const navigate = useNavigate();
  const { user, followUnfollow, bookmark, removeBookmark } =
    useContext(UserContext);
  const { setEditPost, deletePost, like, deleteComment, comment } =
    useContext(PostContext);
  const [showComments, setShowComments] = useState(false);
  const [showLikedBy, setShowLikedBy] = useState(false);

  const handleComment = async (event) => {
    event.preventDefault();
    const commentText = event.target[0].value;
    event.target[0].value = "";
    const newComment = {
      userID: user._id,
      username: user.username,
      name: user.name,
      commentText,
      profilePicture: user.profilePicture,
    };
    comment(_id, newComment);
  };

  const FollowingLiker = likes.find(({ _id }) => user.following.includes(_id));

  return (
    <article className="post-card card" key={_id}>
      <img src={userID.profilePicture} alt="dp" className="thumbnail" />
      <span
        className="user-tags link"
        onClick={() => navigate(`/profile/${userID.username}`)}
      >
        <b>{userID.name}</b>
        <em>@{userID.username}</em>
      </span>
      {img && <img src={img} alt="post img" />}
      {postBody && <p>{postBody}</p>}
      <span className="media-buttons">
        <button
          className={
            likes.find((likedBy) => likedBy._id === user._id)
              ? "active"
              : "inactive"
          }
          onClick={() => like(_id)}
        >
          <BsHeart size={"1.25rem"} />
        </button>
        <Link
          className="rigth-auto"
          onClick={() => setShowComments((prev) => !prev)}
        >
          <AiOutlineComment size={"1.5rem"} />
        </Link>
        {!user.bookmarks.includes(_id) ? (
          <button onClick={() => bookmark(_id)}>
            <BsBookmarkPlus size={"1.25rem"} />
          </button>
        ) : (
          <button onClick={() => removeBookmark(_id)} className="active">
            <BsBookmarkDash size={"1.25rem"} />
          </button>
        )}
      </span>
      {Boolean(likes.length) && (
        <p className="liked-counter" onClick={() => setShowLikedBy(true)}>
          {likes.length} people like this{" "}
          {FollowingLiker && <b>including {FollowingLiker.name}</b>}
          {Boolean(comments.length) && ", " + comments.length + " comments"}
        </p>
      )}
      {showComments && (
        <div className="comments">
          <form className="comment-input" onSubmit={handleComment}>
            <input
              type="text"
              required={true}
              placeholder="join the conversation"
            />
            <button type="submit">
              <BiCommentAdd size={"1.5rem"} />
            </button>
          </form>
          {comments.map((comment, index) => (
            <div className="comment" key={index}>
              <img
                src={comment.profilePicture}
                alt="dp"
                className="thumbnail"
              />
              <span
                className="user-tags link"
                onClick={() => navigate(`/profile/${comment.username}`)}
              >
                <b>{comment.name}</b>
                <em>@{comment.username}</em>
              </span>
              <p>{comment.commentText}</p>
              {comment.userID === user._id && (
                <button
                  className="top-right"
                  onClick={() => deleteComment(comment, _id)}
                >
                  <BsTrash size={"1rem"} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {user._id === userID._id ? (
        <span className="top-right">
          <button onClick={() => setEditPost(post)}>
            <BsPencil size={"1.25rem"} />
          </button>
          <button onClick={() => deletePost(_id)}>
            <BsTrash size={"1.25rem"} />
          </button>
        </span>
      ) : !user.following.includes(userID._id) ? (
        <button
          className="top-right"
          onClick={() => followUnfollow(userID._id)}
        >
          <RiUserFollowLine size={"1.25rem"} />
          <span className="tooltip-below">Follow User</span>
        </button>
      ) : (
        <button
          className="top-right"
          onClick={() => followUnfollow(userID._id)}
        >
          <span className="tooltip-below">Unfollow User</span>
          <RiUserUnfollowLine size={"1.25rem"} />
        </button>
      )}
      {showLikedBy && (
        <div className="modal-narrow">
          <h2>Liked By</h2>
          <div className="user-details"></div>
          <button className="top-right" onClick={() => setShowLikedBy(false)}>
            <BsXLg size={"1.5rem"} />
          </button>
          {likes.map((like) => (
            <div className="link">
              <img src={like.profilePicture} alt="dp" className="thumbnail" />
              <span
                className="user-tags link"
                onClick={() => navigate(`/profile/${like.username}`)}
              >
                <b>{like.name}</b>
                <em>@{like.username}</em>
              </span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default PostCard;
