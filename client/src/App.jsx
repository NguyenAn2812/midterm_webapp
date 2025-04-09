import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WatchPage from "./pages/WatchPage";
import LoginPage from "./pages/LoginPage";
import MainContainer from "./components/MainContainer";
import RegisterPage from "./pages/RegisterPage";
import UploadPage from "./pages/UploadPage";
import AccountPage from "./pages/AccountPage";
import ChannelPage from "./pages/ChannelPage";
import MyVideosPage from "./pages/MyVideosPage";
import Navbar from "./components/Navbar";
  
const App = () => {
  return (
    <Router>
        <Navbar />

      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/channel/:id" element={<ChannelPage />} />
        <Route path="/my-videos" element={<MyVideosPage />} />
      </Routes>
    </Router>
  );
};

export default App;
