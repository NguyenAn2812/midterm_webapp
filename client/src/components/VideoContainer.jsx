import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/videos`)
      .then((res) => {
        console.log("Fetched videos:", res.data); // 👈 THÊM DÒNG NÀY
        setVideos(res.data);
      })
      .catch((err) => console.error("Failed to load videos:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4 justify-center">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoContainer;