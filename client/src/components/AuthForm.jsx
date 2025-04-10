import React, { useState } from "react";

const AuthForm = ({ type, onSubmit }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "register" && password !== confirmPassword) {
            return alert("Passwords do not match.");
        }
        const data = type === "register"
            ? { username, email, password }
            : { email, password };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-[#181818] p-6 rounded space-y-4 text-white">
            <h2 className="text-xl font-bold text-center">
                {type === "login" ? "Login" : "Register"}
            </h2>

            {type === "register" && (
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 bg-[#0f0f0f] border border-[#303030] rounded text-white"
                    required
                />
            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-[#0f0f0f] border border-[#303030] rounded text-white"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-[#0f0f0f] border border-[#303030] rounded text-white"
                required
            />

            {type === "register" && (
                <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 bg-[#0f0f0f] border border-[#303030] rounded text-white"
                required
                />
            )}

            <button
                type="submit"
                className={`w-full py-2 rounded-full font-medium transition-colors duration-200
                    ${type === "login"
                    ? "bg-white text-black hover:bg-gray-300"
                    : "border border-white text-white hover:bg-white hover:text-black"}`}
            >
                {type === "login" ? "Log in" : "Register"}
            </button>
        </form>
    );
};

export default AuthForm;
