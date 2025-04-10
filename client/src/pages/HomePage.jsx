import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";

const HomePage = () => {
    const [videos, setVideos] = useState([]);
    const API = import.meta.env.API_BASE_URL;

    useEffect(() => {
        axios
        .get(`${API}/api/videos`)
        .then((res) => setVideos(res.data))
        .catch((err) => console.error("Error fetching videos:", err));
    }, []);

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
                {videos?.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
