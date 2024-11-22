import { connect } from "hubConnection";

const joinRoom = async (roomId, userId) => {
  await connect.invoke("Join", roomId, userId).catch((error) => {
    console.log(error);
  });
};

const leaveRoom = async (roomId) => {
  await connect.invoke("Leave", roomId).catch((error) => {
    console.log(error);
  });
};

const getMessage = (callback) => {
  connect.on("newMessage", (messages) => {
    callback?.(messages);
    return messages;
  });
};

export { joinRoom, leaveRoom, getMessage };
