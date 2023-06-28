import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Feed from "./pages/feed/Feed";
import Profile from "./pages/profile/Profile";
import Post from "./pages/post/Post";
import SIgninSignup from "./pages/signin-signup/SIgninSignup";
import Explore from "./pages/explore/Explore";
import RequiresAuth from "./utils/RequiresAuth";
import { Toaster } from "react-hot-toast";
import CreateButton from "./components/buttons/CreateButton";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { PostContext } from "./contexts/PostContext";
import Create from "./components/create/Create";

function App() {
  const { loggedIn } = useContext(AuthContext);
  const { createPostModal } = useContext(PostContext);

  return (
    <div className="App">
      {loggedIn && (
        <>
          <Header />
          <CreateButton />
          {createPostModal && <Create />}
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
          path="/profile/:username"
          element={
            <RequiresAuth>
              <Profile />
            </RequiresAuth>
          }
        />
        <Route
          path="/post/:postID"
          element={
            <RequiresAuth>
              <Post />
            </RequiresAuth>
          }
        />
        <Route path="/signin" element={<SIgninSignup />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
