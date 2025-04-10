
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentsContainer from "../components/CommentsContainer";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const WatchPage = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [viewed, setViewed] = useState(false);
    const [hasStartedTimer, setHasStartedTimer] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const videoRef = useRef();
    const API = import.meta.env.API_BASE_URL;

    useEffect(() => {
        axios.get(`${API}/api/videos/${id}`)
            .then((res) => {
                setVideo(res.data);
            })
            .catch((err) => console.error("Error loading video:", err));
    }, [id]);

    const handlePlay = () => {
        if (viewed || hasStartedTimer || !videoRef.current) return;
        setHasStartedTimer(true);
        setTimeout(() => {
            axios.patch(`${API}/api/videos/${id}/view`)
                .then(() => {
                    setViewed(true);
                    setVideo(prev => ({ ...prev, views: (prev.views || 0) + 1 }));
                })
                .catch((err) => console.error("Failed to increment view:", err));
        }, 3000);
    };

    const handleLikeToggle = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.patch(`${API}/api/videos/${id}/like`, {}, {
                headers: { Authorization: `Bearer ${token}` }
        });
            setIsLiked(prev => !prev);
            setVideo(prev => ({ ...prev, likes: res.data.likes }));
        } catch (err) {
            alert("You need to login to like.");
        }
    };

    if (!video) return <div className="p-6">Loading...</div>;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN");
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-4 bg-[#0f0f0f] text-white min-h-screen">
            <video
                ref={videoRef}
                className="w-full rounded-lg"
                src={`${API}${video.videoUrl}`}
                controls
                onPlay={handlePlay}
            />

            <h1 className="text-2xl font-bold">{video.title}</h1>
            <Link
                to={`/channel/${video.uploadedBy._id}`}
                className="flex items-center space-x-3 mt-2 hover:opacity-80"
            >
                <img
                    src={`${API}${video.uploadedBy.avatar || "/uploads/avatars/default.png"}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-white">{video.uploadedBy.username}</span>
            </Link>
            <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{video.views} view {formatDate(video.createdAt)}</span>
                <button
                    onClick={handleLikeToggle}
                    className={`flex items-center space-x-1 ${
                    isLiked ? "text-white" : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                    <Icon icon={isLiked ? "mdi:thumb-up" : "mdi:thumb-up-outline"} className="text-2xl" />
                    <span>{video.likes || 0}</span>
                </button>
            </div>

            <p className="text-base text-gray-300 whitespace-pre-line leading-relaxed">
                {video.description}
            </p>

            <div className="mt-8">
                <CommentsContainer videoId={id} />
            </div>
        </div>
    );
};

export default WatchPage;