import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StackGrid from "react-stack-grid";
import Loader from "../../components/Loader";
import PostCard from "../../components/post-card/PostCard";
import "./Profile.css";
import { BsPencil, BsXLg } from "react-icons/bs";
import { PostContext } from "../../contexts/PostContext";
import { UserContext } from "../../contexts/UserContext";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { username } = useParams();
  const { user, followUnfollow } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const { refresh } = useContext(PostContext);
  const navigate = useNavigate();
  const windowWidth = useRef(window.innerWidth);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showEditProfileMenu, setShowEditProfileMenu] = useState(true);

  const columnWidth = windowWidth.current > 620 ? 300 : windowWidth.current - 3;

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const {
        data: { profile },
      } = await axios.get(
        "https://touter-bak.onrender.com//api/user/profile/" + username,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setProfile(profile);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
    setShowFollowers(false);
    setShowFollowing(false);
    setShowEditProfileMenu(false);
    document.title = "Profiles | Touter";
  }, [username]);

  useEffect(() => {
    if (refresh) getProfile();
  }, [refresh]);

  console.log(profile);

  return loading ? (
    <Loader />
  ) : (
    <div className={loading ? "page" : "page blip"}>
      {showEditProfileMenu && (
        <EditProfile
          closeModal={setShowEditProfileMenu}
          getProfile={getProfile}
        />
      )}
      <div className="profile-container">
        <article className="profile-card card">
          <img src={profile.coverPicture} alt="cover" className="cover" />
          <span className="container-flex">
            <button onClick={() => setShowFollowing(true)}>
              {profile.following.length} <em>following</em>
            </button>
            <img
              src={profile.profilePicture}
              alt="dp"
              className="profile-picture"
            />
            <button onClick={() => setShowFollowers(true)}>
              {profile.followers.length} <em>Followers</em>
            </button>
          </span>
          <div className="user-tags">
            <h2>
              {profile.name}
              {user._id === profile._id ? (
                <button
                  onClick={() => setShowEditProfileMenu(true)}
                  className="btn-name"
                >
                  <BsPencil size={"1.1rem"} />
                </button>
              ) : !user.following.includes(profile._id) ? (
                <button
                  className="btn-name"
                  onClick={() => followUnfollow(profile._id)}
                >
                  <RiUserFollowLine size={"1.25rem"} />
                </button>
              ) : (
                <button
                  className="btn-name"
                  onClick={() => followUnfollow(profile._id)}
                >
                  <RiUserUnfollowLine size={"1.25rem"} />
                </button>
              )}
            </h2>
            <p>
              <em>@{profile.username}</em>
            </p>
          </div>
          {profile.bio && (
            <p className="bio">
              <em>About Me</em>
              {profile.bio}
            </p>
          )}
          {profile.links && (
            <p className="links">
              <em>My Links:</em>
              <a href={profile.links}>{profile.links}</a>
            </p>
          )}
          {showFollowing && (
            <div className="modal-narrow">
              <h2>Following</h2>
              <button
                className="top-right"
                onClick={() => setShowFollowing(false)}
              >
                <BsXLg size={"1.5rem"} />
              </button>
              {profile.following.map((like) => (
                <div className="flex">
                  <img
                    src={like.profilePicture}
                    alt="dp"
                    className="thumbnail"
                  />
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
          {showFollowers && (
            <div className="modal-narrow">
              <h2>Followers</h2>
              <button
                className="top-right"
                onClick={() => setShowFollowers(false)}
              >
                <BsXLg size={"1.5rem"} />
              </button>
              {profile.followers.map((like) => (
                <div className="flex">
                  <img
                    src={like.profilePicture}
                    alt="dp"
                    className="thumbnail"
                  />
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
      </div>
      <StackGrid columnWidth={columnWidth}>
        {profile.posts.map((post) => (
          <PostCard post={post} key={post._id} fetchPosts={getProfile} />
        ))}
        <div className="end-reached card">{"YOU HAVE REACHED THE END : ("}</div>
      </StackGrid>
    </div>
  );
};

export default Profile;
