import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Feed from "./pages/feed/Feed";
import Profile from "./pages/profile/Profile";
import SIgninSignup from "./pages/signin-signup/SIgninSignup";
import Explore from "./pages/explore/Explore";
import RequiresAuth from "./utils/RequiresAuth";
import { Toaster } from "react-hot-toast";
import CreateButton from "./components/buttons/CreateButton";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { PostContext } from "./contexts/PostContext";
import Create from "./components/create/Create";
import Bookmarked from "./pages/bookmarked/Bookmarked";
import Footer from "./components/footer/Footer";
import Search from "./pages/search/Search";

function App() {
  const { loggedIn } = useContext(AuthContext);
  const { createPostModal, editPost } = useContext(PostContext);

  return (
    <div className="App">
      {loggedIn && (
        <>
          <Header />
          <CreateButton />
          <Footer />
          {createPostModal && <Create />}
          {editPost._id && <Create />}
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <RequiresAuth>
              <Feed />
            </RequiresAuth>
          }
        />
        <Route
          path="/explore"
          element={
            <RequiresAuth>
              <Explore />
            </RequiresAuth>
          }
        />
        <Route
          path="/bookmarked"
          element={
            <RequiresAuth>
              <Bookmarked />
            </RequiresAuth>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <RequiresAuth>
              <Profile />
            </RequiresAuth>
          }
        />
        <Route path="/signin" element={<SIgninSignup />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
