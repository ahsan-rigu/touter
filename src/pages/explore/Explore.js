import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import StackGrid from "react-stack-grid";
import PostCard from "../../components/post-card/PostCard";
import { PostContext } from "../../contexts/PostContext";
import Loader from "../../components/Loader";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const { refresh } = useContext(PostContext);
  const [loading, setLoading] = useState(true);

  const windowWidth = useRef(window.innerWidth);

  const columnWidth = windowWidth.current > 620 ? 300 : windowWidth.current - 3;

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8080/api/post/posts", {
        headers: { authorization: `Bearer ${token}` },
      });
      setPosts([...res.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (refresh) fetchPosts();
  }, [refresh]);

  return (
    <div className="page">
      {loading ? (
        <Loader />
      ) : (
        <StackGrid columnWidth={columnWidth}>
          {posts.map((post) => (
            <PostCard post={post} key={post._id} fetchPosts={fetchPosts} />
          ))}
          <div className="end-reached card">
            {"YOU HAVE REACHED THE END : ("}
          </div>
        </StackGrid>
      )}
    </div>
  );
};

export default Explore;
