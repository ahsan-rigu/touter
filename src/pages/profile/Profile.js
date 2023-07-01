import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import StackGrid from "react-stack-grid";
import Loader from "../../components/Loader";
import PostCard from "../../components/post-card/PostCard";
import "./Profile.css";

const Profile = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const windowWidth = useRef(window.innerWidth);

  const columnWidth = windowWidth.current > 620 ? 300 : windowWidth.current - 3;

  const getProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const {
        data: { profile },
      } = await axios.get(
        "http://localhost:8080/api/user/profile/" + username,
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
  }, []);

  console.log(profile);

  return loading ? (
    <Loader />
  ) : (
    <div className="page">
      <StackGrid columnWidth={columnWidth}>
        <article className="profile-card card">
          <img src={profile.coverPicture} alt="cover" />
          <img src={profile.profilePicture} alt="dp" />
          <button>{profile.following.length} following</button>
          <button>{profile.followers.length} following</button>
          <button>{profile.posts.length} posts</button>
        </article>
        {profile.posts.map((post) => (
          <PostCard post={post} key={post._id} fetchPosts={getProfile} />
        ))}
        <div className="end-reached card">{"YOU HAVE REACHED THE END : ("}</div>
      </StackGrid>
    </div>
  );
};

export default Profile;
