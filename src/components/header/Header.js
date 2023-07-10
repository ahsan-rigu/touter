import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { SlCompass } from "react-icons/sl";
import {
  BsBookmark,
  BsChatDots,
  BsChevronLeft,
  BsHouse,
  BsSearch,
} from "react-icons/bs";

import "./Header.css";
import { Link } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import { UserContext } from "../../contexts/UserContext";

const Header = () => {
  const { signOut } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  return (
    <header className="top-bar">
      <span className="logo">TOUTER</span>
      <nav className="nav-pc-tab">
        <Link to="/">
          <BsHouse size={"1.7rem"} />
          <span className="tooltip-below">Home Feed</span>
        </Link>

        {/* <Link to="/search">
          <BsSearch size={"1.5rem"} className="search-icon" />
          <span className="tooltip-below">Search</span>
        </Link> */}
        <Link to="explore">
          <SlCompass size={"1.5rem"} className="compass-icon" />
          <span className="tooltip-below">Explore</span>
        </Link>
        <Link to="/bookmarked">
          <BsBookmark size={"1.5rem"} className="heart-icon" />
          <span className="tooltip-below">Bookmarks</span>
        </Link>
      </nav>
      <nav className="buttons-rights">
        {/* <Link>
          <BsChatDots size={"1.4rem"} />
          <span className="tooltip-below">Chats</span>
        </Link> */}
        <Link to={"/profile/" + user.username}>
          <AiOutlineUser size={"1.5rem"} />
          <span className="tooltip-below">Your Profile</span>
        </Link>
        <button onClick={signOut}>
          <AiOutlineLogout size={"1.5rem"} />
        </button>
        <ThemeButton />
      </nav>
    </header>
  );
};

export default Header;
