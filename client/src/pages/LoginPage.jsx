import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useUser } from "../context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const API = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, data);
      login(res.data.token); // Cập nhật user vào context
      navigate("/");
    } catch (err) {
      alert("Đăng nhập thất bại: " + err.response?.data?.message || "Lỗi không xác định");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f] text-white">
      <div className="w-full max-w-md p-6 bg-[#181818] rounded-lg shadow border border-[#303030]">
        <h2 className="text-2xl font-semibold text-center">🔐 Đăng nhập vào Wetube</h2>
        <AuthForm type="login" onSubmit={handleLogin} />

        <p className="text-sm mt-4 text-center text-gray-400">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-[#3ea6ff] hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
