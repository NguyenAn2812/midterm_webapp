// pages/MyVideosPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";

const MyVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API}/api/videos/my`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setVideos(res.data))
      .catch(err => console.error("Lỗi khi lấy video cá nhân", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-4">
      <h2 className="text-2xl font-semibold mb-4">Video của tôi</h2>
      <div className="flex flex-wrap gap-4">
        {videos.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default MyVideosPage;
