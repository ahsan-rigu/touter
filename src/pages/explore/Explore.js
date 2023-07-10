import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import StackGrid from "react-stack-grid";
import PostCard from "../../components/post-card/PostCard";
import { PostContext } from "../../contexts/PostContext";
import Loader from "../../components/Loader";
import sortHelper from "../../utils/sortHelper";
import { useLocation } from "react-router-dom";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const { refresh } = useContext(PostContext);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const windowWidth = useRef(window.innerWidth);

  const columnWidth = windowWidth.current > 620 ? 300 : windowWidth.current - 3;

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "https://touter-bak.onrender.com/api/post/posts",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setPosts([...res.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const observerTarget = useRef(null);

  useEffect(() => {
    console.log(observerTarget);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchPosts();
    document.title = "Explore | Touter";
  }, []);

  useEffect(() => {
    if (refresh) fetchPosts();
  }, [refresh]);

  return (
    <div className={loading ? "page" : "page blip"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className="sort-drop"
          >
            <option value="default">Sort</option>
            <option value="latest">Latest</option>
            <option value="likes">Popular</option>
          </select>
          <StackGrid columnWidth={columnWidth}>
            {sortHelper(posts, sort)
              .filter((none, i) => i < page * 10)
              .map((post) => (
                <PostCard post={post} key={post._id} fetchPosts={fetchPosts} />
              ))}
            {page * 10 > posts.length && (
              <div className="end-reached card">
                {"YOU HAVE REACHED THE END : ("}{" "}
              </div>
            )}
            {page * 10 <= posts.length && (
              <div className="shimmer card">
                <span className="shimmer-thumb" ref={observerTarget}></span>
                <span className="shimmer-tags"></span>
                <div className="shimmer-img"></div>
              </div>
            )}
          </StackGrid>
        </>
      )}
    </div>
  );
};

export default Explore;
