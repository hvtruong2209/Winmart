import { Home } from "page/client/home";
import "./index.scss";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { useNavigate } from "react-router-dom";
export const HomeClient = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Home></Home>
      <div
        className="chat-round"
        onClick={() => {
          navigate("/chat");
        }}
      >
        <InsertCommentIcon style={{ color: "white" }} />
      </div>
    </div>
  );
};
