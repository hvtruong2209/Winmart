import "./index.scss";
import { getUrlImage } from "Utils";
import { PlayArrow, Image } from "@mui/icons-material";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChatService } from "api/Chat";
import * as signalR from "@microsoft/signalr";
import { Message } from "model";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { getMessage, joinRoom, leaveRoom } from "Utils/hubHandler";

export const ChatClient = (props: any) => {
  const listMessage = useRef<Message[]>([]);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "hellojdhdhf h jhdf hjdh f hfdhfjdhfjdhf ",
      roomId: 1,
      timestamp: "11111",
    },
  ]);
  const [content, setContent] = useState<string>("");
  // const userId = localStorage.getItem("userId") || 1;
  const location = useLocation();
  const hiddenChat = useMemo(() => {
    const urlHidden = ["/login", "/register"];
    return !urlHidden.includes(location.pathname);
  }, [location]);

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

  useEffect(() => {
    // console.log("message", getMessage());
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   const newConnection = new signalR.HubConnectionBuilder()
  //     .withUrl("https://localhost:44360/chatHub")
  //     .configureLogging(signalR.LogLevel.Information)
  //     .build();
  //   newConnection
  //     .start()
  //     .then(() => {
  //       console.log("Success connect!");
  //     })
  //     .catch(() => console.error("Error connect!"));

  //   newConnection.on("newMessage", (messageView: Message) => {
  //     setMessages([...listMessage.current, messageView]);
  //     listMessage.current = [...listMessage.current, messageView];
  //   });

  //   newConnection.invoke("Join", "", localStorage.getItem("userId"));

  //   return () => {
  //     if (newConnection) {
  //       newConnection.stop();
  //     }
  //   };
  // }, []);

  return (
    <>
      {hiddenChat && !isOpenChat && (
        <div
          className="chat-round"
          onClick={() => {
            setIsOpenChat(true);
            joinRoom(
              localStorage.getItem("roomId"),
              localStorage.getItem("userId")
            );
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
                setIsOpenChat(false);
                leaveRoom(localStorage.getItem("roomId"));
              }}
            />
          </div>
          <div className="message-container">
            {messages?.map((item, index) => {
              if (item.userId === 1)
                return (
                  <span className="mess-system" key={index}>
                    <img
                      alt="avatar"
                      src={getUrlImage("avataradminchat.jpg")}
                    ></img>
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
              <input
                type="file"
                id="uploadImageField"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
