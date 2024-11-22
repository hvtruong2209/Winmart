import { HubConnectionBuilder } from "@microsoft/signalr";

const hubConnection = () => {
  const connect = new HubConnectionBuilder()
    .withUrl("https://localhost:44360/chatHub")
    .withAutomaticReconnect([0, 2000, 3000])
    .build();
  return connect;
};

const connect = hubConnection();

export { connect, hubConnection };
