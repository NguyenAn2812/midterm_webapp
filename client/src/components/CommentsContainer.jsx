import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useUser } from "../context/UserContext";
const CommentsContainer = ({ videoId }) => {
    const API = import.meta.env.VITE_API_BASE_URL;
    const { user } = useUser();

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        axios.get(`${API}/api/comments/${videoId}`)
        .then((res) => setComments(res.data))
        .catch((err) => console.error("Failed to fetch comments:", err));
    }, [videoId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `${API}/api/comments/${videoId}`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setComments([res.data, ...comments]);
            setContent("");
        } catch (err) {
            alert("You must be logged in to comment.");
        }
    };

    const formatTimeAgo = (dateStr) => {
        const date = new Date(dateStr);
        const seconds = Math.floor((new Date() - date) / 1000);

        const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
        };

        for (let [unit, value] of Object.entries(intervals)) {
            const count = Math.floor(seconds / value);
            if (count > 0) return `${count} ${unit} ago`;
        }
        return "now";
    };

    return (
        <div className="text-white">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon icon="mdi:comment-outline" className="text-xl" />Comment
            </h2>

            <form onSubmit={handleSubmit} className="flex items-start gap-3 mb-6">
                <img
                    src={
                        user?.avatar
                        ? `${API}${user.avatar}`
                        : `${API}/uploads/avatars/default.png`
                     }
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={2}
                        placeholder="Write a comment..."
                        className="w-full bg-transparent border-b border-[#303030] text-white focus:outline-none resize-none p-2"
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            className="bg-white text-black font-medium text-sm px-4 py-1.5 rounded-full hover:brightness-110 transition duration-200"
                        >
                            Send
                        </button>

                    </div>
                </div>
            </form>

            <div className="space-y-4">
                {comments.map((c) => (
                    <div key={c._id} className="flex items-start gap-3 border-b border-[#303030] pb-4">
                        <img
                            src={c.user?.avatar ? `${API}${c.user.avatar}` : `${API}/uploads/avatars/default.png`}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold">{c.user?.username || "Anonymous user"}</p>
                                <p className="text-xs text-gray-400">{formatTimeAgo(c.createdAt)}</p>
                            </div>
                            <p className="text-sm text-gray-300 whitespace-pre-line mt-1">{c.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsContainer;
