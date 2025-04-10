import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; 
const UserContext = createContext();
const API = import.meta.env.API_BASE_URL;
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loadUserFromToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) return setUser(null);
    
        try {
            const res = await axios.get(`${API}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        loadUserFromToken();
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);
        await loadUserFromToken(); 
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => useContext(UserContext);
