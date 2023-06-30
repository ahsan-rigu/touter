import React, { useContext } from "react";
import {
  BsBookmark,
  BsFillPlusCircleFill,
  BsHouse,
  BsSearch,
} from "react-icons/bs";
import "./footer.css";
import { Link } from "react-router-dom";
import { SlCompass } from "react-icons/sl";
import { PostContext } from "../../contexts/PostContext";

const Footer = () => {
  const { setCreatePostModal } = useContext(PostContext);
  return (
    <footer className="footer">
      <Link to="/">
        <BsHouse size={"2.25rem"} />
      </Link>
      <Link to="/search">
        <BsSearch size={"2.25rem"} className="search-icon" />
      </Link>
      <button
        className="btn-create-mobile"
        onClick={() => setCreatePostModal(true)}
      >
        <BsFillPlusCircleFill size={"3.5rem"} />
      </button>
      <Link to="explore">
        <SlCompass size={"2.25rem"} className="compass-icon" />
      </Link>
      <Link to="/bookmarked">
        <BsBookmark size={"2.25rem"} className="heart-icon" />
      </Link>
    </footer>
  );
};

export default Footer;
