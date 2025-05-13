"use client";

import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
  }, []);

  const login = async (inputs) => {
    try {
      const res = await axiosInstance.post("/auth/login", inputs, {
        withCredentials: true,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("accessToken", res.data.accessToken);

      setCurrentUser(res.data.user);
      return res;
    } catch (error) {
      console.error("Login Failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/signOut", null, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout Failed", error);
      throw error;
      
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
