import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import StackGrid from "react-stack-grid";
import Loader from "../../components/Loader";
import PostCard from "../../components/post-card/PostCard";

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

  return loading ? (
    <Loader />
  ) : (
    <div className="page">
      <StackGrid columnWidth={columnWidth}>
        {/* <article className="profile-card card"></article> */}
        {profile.posts.map((post) => (
          <PostCard post={post} key={post._id} fetchPosts={getProfile} />
        ))}
        <div className="end-reached card">{"YOU HAVE REACHED THE END : ("}</div>
      </StackGrid>
    </div>
  );
};

export default Profile;
