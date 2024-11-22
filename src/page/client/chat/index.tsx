import "./index.scss";
import { getUrlImage } from "Utils";
import { PlayArrow, Image } from "@mui/icons-material";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChatService } from "api/Chat";
import * as signalR from "@microsoft/signalr";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

export const ChatClient = (props: any) => {
  const listMessage = useRef<any[]>([]);
  const scrollRef = useRef<any>(null);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState<string>("");
  const userId = localStorage.getItem("userId");
  const roomId = localStorage.getItem("roomId");
  const location = useLocation();
  const hiddenChat = useMemo(() => {
    const urlHidden = ["/login", "/register"];
    return !urlHidden.includes(location.pathname);
  }, [location]);
  const [connection, setConnection] = useState<any>(null);

  const onSendMessage = async () => {
    await ChatService.sendMessage({
      content: content,
      conservationId: localStorage.getItem("roomId") || "",
      userId: localStorage.getItem("userId") || "",
    });
    setContent("");
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("FileUpload", file);
    await ChatService.upload(formData);
  };

  const getMess = async () => {
    const response = await ChatService.getMessage({ roomId: localStorage.getItem("roomId"), page: 0 });
    listMessage.current = [...(response.result || [])].reverse();
    setMessages([...(response.result || [])].reverse());
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    getMess();
    const connect = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44360/chatHub")
      .withAutomaticReconnect()
      .build();

    connect.on("newMessage", (message) => {
      console.log("newMessage", message);
      setMessages([...listMessage.current, message]);
      listMessage.current.push(message);
    });

    connect
      .start()
      .then(() => setConnection(connect))
      .catch((err) => console.error("Connection failed: ", err));

    return () => {
      connect.stop();
      leaveRoom();
    };
  }, []);

  const joinRoom = async () => {
    if (connection) {
      try {
        await connection.invoke("join", roomId, userId);
        console.log("join", roomId, userId);
        // setMessages((prevMessages) => [...prevMessages, `You joined room ${roomName}`]);
      } catch (err) {
        console.error("Join room failed: ", err);
      }
    }
  };

  const leaveRoom = async () => {
    if (connection) {
      try {
        await connection.invoke("leave", roomId);
        console.log("leave");
        // setMessages((prevMessages) => [...prevMessages, `You left room ${roomName}`]);
      } catch (err) {
        console.error("Leave room failed: ", err);
      }
    }
  };

  return (
    <>
      {hiddenChat && !isOpenChat && (
        <div
          className="chat-round"
          onClick={() => {
            joinRoom();
            setIsOpenChat(true);
          }}
        >
          <InsertCommentIcon style={{ color: "white" }} />
        </div>
      )}
      {isOpenChat && (
        <div className="chat-client container-wrap flex flex-col bg-white">
          <div className="chat-header">
            <CloseIcon
              onClick={() => {
                leaveRoom();
                setIsOpenChat(false);
                // leaveRoom(localStorage.getItem("roomId"));
              }}
            />
          </div>
          <div className="message-container" ref={scrollRef}>
            {messages?.map((item: any, index) => {
              if (item.fromUserId !== userId)
                return (
                  <span className="mess-system" key={index}>
                    <img alt="avatar" src={getUrlImage("avataradminchat.jpg")}></img>
                    <div className="text">
                      <div className="info">
                        {/* <span className="name">{item.name}</span> */}
                        <span style={{ fontSize: 9 }}>{item.timestamp}</span>
                      </div>
                      <span className="content">{item.content}</span>
                    </div>
                  </span>
                );
              return (
                <div className="mess-client" key={index}>
                  <div className="text">
                    <div className="info">
                      <span style={{ fontSize: 9 }}>{item.timestamp}</span>
                    </div>
                    <span className="content">{item.content}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chat-bar">
            <input
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSendMessage();
                }
              }}
            ></input>
            <div className="icon-right">
              <Image
                onClick={() => {
                  document.getElementById("uploadImageField")!.click();
                }}
              />
              <PlayArrow
                onClick={() => {
                  onSendMessage();
                }}
              />
              <input type="file" id="uploadImageField" style={{ display: "none" }} onChange={handleFileChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
