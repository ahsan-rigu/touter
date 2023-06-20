import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Feed from "./pages/feed/Feed";
import Profile from "./pages/profile/Profile";
import Post from "./pages/post/Post";
import SIgninSignup from "./pages/signin-signup/SIgninSignup";
import Explore from "./pages/explore/Explore";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/post/:postID" element={<Post />} />
        <Route path="/signin" element={<SIgninSignup />} />
      </Routes>
    </div>
  );
}

export default App;
