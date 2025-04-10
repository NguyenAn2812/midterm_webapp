import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";

const MyVideosPage = () => {
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState(null);
    const API = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`${API}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => setUser(res.data))
            .catch(err => console.error("Error getting user information", err));

        axios.get(`${API}/api/videos/my`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => setVideos(res.data))
            .catch(err => console.error("Error while retrieving personal video", err));
    }, []);

    if (!user) return <div className="p-6 text-white">Loading</div>;

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-4">
            <h2 className="text-2xl font-semibold mb-4">My video</h2>
            <div className="flex flex-wrap gap-4">
                {videos.map(video => (
                    <VideoCard
                        key={video._id}
                        video={{
                        ...video,
                        uploadedBy: typeof video.uploadedBy === "string" ? user : video.uploadedBy
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyVideosPage;
