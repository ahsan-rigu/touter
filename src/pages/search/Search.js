import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommended = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "https://touter-bak.onrender.com/api/user/recommended",
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      data.sort((a, b) => b.score - a.score);
      setRecommended(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  console.log(recommended);

  useEffect(() => {
    getRecommended();
    document.title = "Search | Touter";
  }, []);

  return (
    <div className="search-page">
      <section className="reccomended">
        <h2>Recommended Users...</h2>
        {recommended.length > 0 ? (
          recommended.map((like) => (
            <div className="flex">
              <img src={like.profilePicture} alt="dp" className="thumbnail" />
              <span
                className="user-tags link"
                onClick={() => navigate(`/profile/${like.username}`)}
              >
                <b>{like.name}</b>
                <em>@{like.username}</em>
              </span>
            </div>
          ))
        ) : (
          <div>Nothing Here : (</div>
        )}
      </section>
    </div>
  );
};

export default Search;
