import { ClientNav } from "component/clientnav";
import { Footer } from "component/footer";
import "./index.scss";
import { getUrlImage } from "Utils";
import { PlayArrow, Image } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ChatService } from "api/Chat";
const data = [
  {
    userId: "12345",
    name: "Truong",
    text: "oke la",
    time: "02:12 01/04/2021",
    type: "user",
  },
  {
    userId: "12345",
    name: "Truong",
    text: "1111111111111111111111",
    time: "02:12 01/04/2021",
    type: "system",
  },
  {
    userId: "12345",
    name: "Truong",
    text: "2222222222222222222222",
    time: "02:12 01/04/2021",
    type: "system",
  },
  {
    userId: "12345",
    name: "Truong",
    text: "33333333333333333333333333333",
    time: "02:12 01/04/2021",
    type: "user",
  },
  {
    userId: "12345",
    name: "Truong",
    text: "oke la",
    time: "02:12 01/04/2021",
    type: "user",
  },
  {
    userId: "12345",
    text: "1111111111111111111111",
    name: "Truong",
    time: "02:12 01/04/2021",
    type: "system",
  },
  {
    userId: "12345",
    text: "2222222222222222222222",
    time: "02:12 01/04/2021",
    name: "Truong",
    type: "system",
  },
  {
    userId: "12345",
    text: "33333333333333333333333333333",
    time: "02:12 01/04/2021",
    name: "Truong",
    type: "user",
  },
  {
    userId: "12345",
    name: "Truong",
    text: "oke la",
    time: "02:12 01/04/2021",
    type: "user",
  },
  {
    userId: "12345",
    text: "1111111111111111111111",
    time: "02:12 01/04/2021",
    name: "Truong",
    type: "system",
  },
  {
    userId: "12345",
    text: "2222222222222222222222",
    name: "Truong",
    time: "02:12 01/04/2021",
    type: "system",
  },
  {
    userId: "12345",
    text: "33333333333333333333333333333",
    name: "Truong",
    time: "02:12 01/04/2021",
    type: "user",
  },
];
export const ChatClient = () => {
  const [textState, setTextState] = useState<string>("");
  const onSendMessage = () => {
    //handle
    setTextState("");
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    await ChatService.upload(formData);
  };

  const initChat = async () => {
    const res = await ChatService.getRoom();
    console.log("res", res);
  };

  useEffect(() => {
    initChat();
  }, []);

  return (
    <div className="bg-bgGray">
      <ClientNav />
      <div className="flex justify-center">
        <div className="chat-client container-wrap flex flex-col bg-white">
          <div className="message-container">
            {data.map((item, index) => {
              if (item.type === "system")
                return (
                  <span className="mess-system" key={index}>
                    <img alt="avatar" src={getUrlImage("avataradminchat.jpg")}></img>
                    <div className="text">
                      <div className="info">
                        {/* <span className="name">{item.name}</span> */}
                        <span>{item.time}</span>
                      </div>
                      <span className="content">{item.text}</span>
                    </div>
                  </span>
                );
              return (
                <div className="mess-client" key={index}>
                  <div className="text">
                    <div className="info">
                      <span>{item.time}</span>
                    </div>
                    <span className="content">{item.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chat-bar">
            <input
              onChange={(e) => {
                setTextState(e.target.value);
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
