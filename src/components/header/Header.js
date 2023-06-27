import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { SlCompass } from "react-icons/sl";
import {
  BsBoxArrowRight,
  BsChatDots,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsCompass,
  BsHeart,
  BsHouse,
  BsPerson,
  BsSearch,
} from "react-icons/bs";

import "./Header.css";
import { Link } from "react-router-dom";
import ThemeButton from "../ThemeButton";

const Header = () => {
  const { signOut } = useContext(AuthContext);
  const [navExtend, setNavExtend] = useState(true);

  return (
    <header className="top-bar">
      <span className="logo">TOUTER</span>
      <nav>
        <Link>
          <BsHouse size={"1.7rem"} />
        </Link>

        <Link>
          <BsSearch size={"1.5rem"} className="search-icon" />
        </Link>
        <Link>
          <SlCompass size={"1.5rem"} className="compass-icon" />
        </Link>
        <Link>
          <BsHeart size={"1.5rem"} className="heart-icon" />
        </Link>
      </nav>
      <nav
        className={navExtend ? "nav-extended buttons-right" : "buttons-right"}
      >
        <Link>
          <BsChatDots size={"1.4rem"} />
        </Link>
        <Link onClick={signOut}>
          <AiOutlineUser size={"1.5rem"} />
        </Link>
        <button
          onClick={() => setNavExtend((prev) => !prev)}
          className="extend-button"
        >
          <BsChevronLeft size={"1.5rem"} />
        </button>

        <button>
          <AiOutlineUserSwitch size={"1.5rem"} />
        </button>
        <button onClick={signOut}>
          <AiOutlineLogout size={"1.5rem"} />
        </button>
        <ThemeButton />
      </nav>
    </header>
  );
};

export default Header;
