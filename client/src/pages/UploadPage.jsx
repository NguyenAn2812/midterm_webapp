import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const API = import.meta.env.API_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to log in to upload videos.");
            navigate("/login");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!videoFile) return alert("Please select video file");

        const formData = new FormData();
        formData.append("video", videoFile);
        formData.append("title", title);
        formData.append("description", description);

        try {
            try {
                setIsUploading(true);
                const token = localStorage.getItem("token");
                await axios.post(`${API}/api/videos`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("Upload thành công!");
                setTitle("");
                setDescription("");
                setVideoFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                navigate("/");
            } catch (err) {
                console.error(err);
                alert("Upload failed!");
            } finally {
                setIsUploading(false);
            }
        } catch (err) {
            console.error(err);
            alert("Upload failed!");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center">
            <div className="w-full max-w-md p-6 bg-[#181818] rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-center">⬆️ Upload Video</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 rounded bg-[#0f0f0f] border border-[#303030] text-white"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded bg-[#0f0f0f] border border-[#303030] text-white"
                        rows={3}
                    />
                    <input
                        type="file"
                        accept="video/*"
                        ref={fileInputRef}
                        onChange={(e) => setVideoFile(e.target.files[0])}
                        className="w-full text-sm"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`w-full text-white font-semibold py-2 rounded ${
                            isUploading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isUploading ? "Uploading..." : "Upload"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadPage;
