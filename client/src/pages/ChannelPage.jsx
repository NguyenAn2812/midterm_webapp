import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { Icon } from "@iconify/react";

const ChannelPage = () => {
    const API = import.meta.env.VITE_API_BASE_URL;

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get(`${API}/api/users/${id}`)
            .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to fetch user info:", err));

        axios.get(`${API}/api/videos/user/${id}`)
            .then((res) => {
                console.log("📼 Videos in ChannelPage:", res.data);
                setVideos(res.data);
            })
            .catch((err) => console.error("Failed to fetch user videos:", err));
    }, [id]);

    if (!user) return <div className="p-6 text-white">Loading...</div>;
    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-4">
            <div className="flex items-center space-x-4 mb-6">
                <img
                    src={`${API}${user.avatar || "/uploads/avatars/default.png"}`}
                    alt="avatar"
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        {user.username}
                    </h1>
                    <p className="text-sm text-gray-400">{user.email}</p>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon icon="mdi:video-outline" className="text-lg" /> Video posted
            </h2>
            <div className="flex flex-wrap gap-4">
                {videos.map((video) => (
                    <VideoCard
                        key={video._id}
                        video={{
                            ...video,
                            uploadedBy: user && typeof video.uploadedBy === "string" ? user : video.uploadedBy
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChannelPage;
