import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_BASE_URL;
    const handleRegister = async (data) => {
        try {
            await axios.post(`${API}/api/auth/register`, data);
            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (err) {
            alert("Registration failed: " + (err.response?.data?.message || "Unknown error"));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f] text-white">
            <div className="w-full max-w-md p-6 bg-[#181818] rounded-lg shadow border border-[#303030]">
                <h2 className="text-2xl font-semibold text-center">Register Wetube account</h2>
                <AuthForm type="register" onSubmit={handleRegister} />

                <p className="text-sm mt-4 text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#3ea6ff] hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
