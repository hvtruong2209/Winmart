import AxiosAPI from "./axios";

class Chat {
  service: any;
  serviceChat: any;
  uploadService: any;
  constructor() {
    this.serviceChat = AxiosAPI(false, "https://localhost:44360/api");
    this.service = AxiosAPI();
    this.uploadService = AxiosAPI(true);
  }

  getRoom = async () => {
    try {
      const response = await this.serviceChat.get(`/rooms`);
      return response;
    } catch {
      return [];
    }
  };

  getMessage = async (info: any) => {
    try {
      const response = await this.serviceChat.get(
        `/messages/getMessagesByRoomId?roomId=${info.roomId}&page=${info.page}`
      );
      return response.data;
    } catch {
      return [];
    }
  };

  sendMessage = async (message: { content: string; conservationId: string; userId: string }) => {
    try {
      await this.serviceChat.post("/messages/sendMessage", message);
    } catch {}
  };

  upload = async (image: any) => {
    try {
      await this.uploadService.post("/upload", image);
    } catch {}
  };
}

export const ChatService = new Chat();
