import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const VideoCard = ({ video }) => {
    const API = import.meta.env.VITE_API_BASE_URL;

    console.log("🧾 UploadedBy info:", video.uploadedBy);
    return (
        <Link to={`/watch/${video._id}`}>
            <div className="w-[330px] bg-zinc-900 text-white rounded-lg overflow-hidden border border-zinc-700 shadow-md hover:shadow-lg transition-all duration-200">
                <div className="w-full bg-black aspect-video overflow-hidden">
                    <video
                        className="w-full h-full object-cover"
                        src={`${API}${video.videoUrl}`}
                        controls={false}
                        muted
                        preload="metadata"
                        playsInline
                        onLoadedMetadata={(e) => (e.target.currentTime = 0.1)}
                    />
                </div>
                <div className="flex p-3 gap-3">
                <img
                    src={`${API}${video.uploadedBy?.avatar || "/uploads/avatars/default.png"}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    />
                    
                <div className="flex flex-col">
                    <p className="text-sm font-semibold leading-snug line-clamp-2">{video.title}</p>
                    <p className="text-xs text-gray-400">{video.uploadedBy?.username || "Unknown"}</p>
                    <p className="text-xs text-gray-500 flex gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                            <Icon icon="mdi:eye-outline" className="text-sm" /> {video.views}
                        </span>
                        <span className="flex items-center gap-1">
                            <Icon icon="mdi:thumb-up-outline" className="text-sm" /> {video.likes || 0}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </Link>
    );
};

export default VideoCard;