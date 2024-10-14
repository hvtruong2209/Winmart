import { Home } from "page/client/home";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PrivateClient = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated"); // Or use a global state for auth

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return props.element;
};
