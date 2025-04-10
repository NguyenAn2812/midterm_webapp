import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Icon } from "@iconify/react";

const Navbar = () => {
    const { user, logout } = useUser();
    const API = import.meta.env.VITE_API_BASE_URL;

    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const menuRef = useRef();
    
    console.log("user.avatar:", user?.avatar);
    console.log("USER IN NAVBAR:", user);

      
    useEffect(() => {
    const handler = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="flex items-center justify-between px-4 py-2 border-b border-[#303030] shadow-sm sticky top-0 bg-[#181818] text-white z-50">
        <Link to="/" className="flex items-center space-x-2 text-white text-xl font-bold">
        <Icon icon="mdi:youtube" className="text-red-600 text-5xl" />
        <span>Wetube</span>
        </Link>
        

        <div className="flex items-center space-x-4 relative" ref={menuRef}>
            {user ? (
            <>
            <Link
                to="/upload"
                className="w-full flex items-center justify-center px-3 py-2 rounded-full font-medium transition-colors duration-200 border border-white text-white hover:bg-white hover:text-black"
                >
                Upload
                </Link>
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 text-sm font-medium text-white hover:text-gray-300"
                >
                <img
                    src={
                        user.avatar
                        ? `${API}${user.avatar}`
                        : `${API}/uploads/avatars/default.png`
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                />
                <span>{user.username}</span>
                <Icon icon="ic:round-arrow-drop-down" className="text-3xl" />
            </button>

            {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-[#181818] text-white shadow-md rounded border border-[#303030] w-40 z-50">
                    <Link to="/my-videos" className="block px-4 py-2 hover:bg-[#2a2a2a]">
                        <Icon icon="mdi:filmstrip" className="inline-block mr-2" /> My Videos
                    </Link>
                    <Link to="/account" className="block px-4 py-2 hover:bg-[#2a2a2a]">
                        <Icon icon="mdi:account-edit" className="inline-block mr-2" /> Edit account
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-[#2a2a2a]"
                    >
                        <Icon icon="mdi:logout" className="inline-block mr-2" /> Logout
                    </button>
                </div>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="text-xl border border-[#3ea6ff] text-[#3ea6ff] px-4 py-1 rounded-full hover:bg-[#3ea6ff]/10 transition">Login</Link>
            
          </>
        )}
        </div>
    </header>
  );
};

export default Navbar;