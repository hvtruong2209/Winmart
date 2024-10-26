import { ClientNav } from "component/clientnav";
import { Footer } from "component/footer";
import "./index.scss";
import { getUrlImage } from "Utils";
import { PlayArrow, Image } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { ChatService } from "api/Chat";
import * as signalR from "@microsoft/signalr";
import { Message } from "model";

export const ChatClient = () => {
  const listMessage = useRef<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState<string>("");
  // const userId = localStorage.getItem("userId") || 1;

  const onSendMessage = async () => {
    await ChatService.sendMessage({
      content: content,
      roomId: 1,
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

  // const initChat = async () => {
  //   const res = await ChatService.getRoom();
  //   console.log("res", res);
  // };

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44354/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("Success connect!");
      })
      .catch(() => console.error("Error connect!"));

    newConnection.on("newMessage", (messageView: Message) => {
      setMessages([...listMessage.current, messageView]);
      listMessage.current = [...listMessage.current, messageView];
    });

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  return (
    <div className="bg-bgGray">
      <ClientNav />
      <div className="flex justify-center">
        <div className="chat-client container-wrap flex flex-col bg-white">
          <div className="message-container">
            {messages?.map((item, index) => {
              if (item.userId === 1)
                return (
                  <span className="mess-system" key={index}>
                    <img alt="avatar" src={getUrlImage("avataradminchat.jpg")}></img>
                    <div className="text">
                      <div className="info">
                        {/* <span className="name">{item.name}</span> */}
                        <span>{item.timestamp}</span>
                      </div>
                      <span className="content">{item.content}</span>
                    </div>
                  </span>
                );
              return (
                <div className="mess-client" key={index}>
                  <div className="text">
                    <div className="info">
                      <span>{item.timestamp}</span>
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
      </div>
      <Footer />
    </div>
  );
};
