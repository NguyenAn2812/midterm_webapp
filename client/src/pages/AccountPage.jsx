import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AccountPage = () => {
    const API = import.meta.env.VITE_API_BASE_URL;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();
    const { login } = useUser(); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!token) return navigate("/login");

        axios.get(`${API}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data.avatar); 
            setAvatar(res.data.avatar);
            setUsername(res.data.username);
        }).catch(() => navigate("/login"));
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        if (password) formData.append("password", password);
        if (avatar) formData.append("avatar", avatar);

        try {
            const token = localStorage.getItem("token");
            await axios.put(`${API}/api/users/me`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            login(token); 
            alert("Information has been updated!");
        } catch (err) {
            alert("Update error:" + err.response?.data?.message || "Unknown error");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white flex justify-center items-center">

            <div className="w-full max-w-md p-6 bg-[#181818] rounded shadow">
                <div className="flex justify-center mb-4">
                    <img
                        src={
                            typeof avatar === "string"
                            ? `${API}${avatar}`
                            : avatar
                            ? URL.createObjectURL(avatar)
                            : `${API}/uploads/avatars/default.png`
                        }
                        alt="Avatar"
                        className="w-28 h-28 rounded-full object-cover border border-[#303030]"
                    />
                </div>
                <h2 className="text-xl font-semibold mb-4">Edit account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">User name</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 rounded bg-[#0f0f0f] border border-[#303030] text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">New password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded bg-[#0f0f0f] border border-[#303030] text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">new avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            className="w-full text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountPage;
