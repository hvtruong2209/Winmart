import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeJWT } from "Utils";
import CircularProgress from "@mui/material/CircularProgress";

export const LoginGoogle = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      const token = tokenFromUrl;
      const decoded = decodeJWT(token);
      localStorage.setItem("profile", JSON.stringify(decoded));
      localStorage.setItem("roomId", decoded.RoomId);
      localStorage.setItem("userId", decoded.Id);
      localStorage.setItem("isAuth", JSON.stringify(true));
      localStorage.setItem("accessToken", token);
      navigate("/");
    }
  }, [navigate]);
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress />
      <h1>Login successful. Redirecting to home page...</h1>
    </div>
  );
};
