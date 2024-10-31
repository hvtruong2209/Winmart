import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PrivateClient = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || token.length <= 0) {
      navigate("/login");
    }
  }, [navigate]);

  return props.element;
};
