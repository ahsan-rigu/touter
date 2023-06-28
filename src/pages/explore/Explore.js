import axios from "axios";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8080/api/post/posts", {
        headers: { authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return <div>Explore</div>;
};

export default Explore;
