import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import StackGrid from "react-stack-grid";
import PostCard from "../../components/post-card/PostCard";
import { PostContext } from "../../contexts/PostContext";
import Loader from "../../components/Loader";
import sortHelper from "../../utils/sortHelper";

const Bookmarked = () => {
  const [posts, setPosts] = useState([]);
  const { refresh } = useContext(PostContext);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");

  const windowWidth = useRef(window.innerWidth);

  const columnWidth = windowWidth.current > 620 ? 300 : windowWidth.current - 3;

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "https://touter-f228e9b8c7a1.herokuapp.com/api/post/bookmarked",
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

  sortHelper(posts, sort);

  useEffect(() => {
    fetchPosts();
    document.title = "Bookmarked | Touter";
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
            {sortHelper(posts, sort).map((post) => (
              <PostCard post={post} key={post._id} fetchPosts={fetchPosts} />
            ))}
            <div className="end-reached card">
              {"YOU HAVE REACHED THE END : ("}
            </div>
          </StackGrid>
        </>
      )}
    </div>
  );
};

export default Bookmarked;
