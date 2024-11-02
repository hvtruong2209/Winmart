import AxiosAPI from "./axios";

class Chat {
  service: any;
  serviceChat: any;
  uploadService: any;
  constructor() {
    this.serviceChat = AxiosAPI(false, "https://localhost:44360/");
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
        `/messages/room/getmessagebyroomid/roomId=${info.roomId}/page=${info.page}`
      );
      return response;
    } catch {
      return [];
    }
  };

  sendMessage = async (message: {
    content: string;
    conservationId: string;
    userId: string;
  }) => {
    try {
      await this.serviceChat.post("api/messages/sendMessage", message);
    } catch {}
  };

  upload = async (image: any) => {
    try {
      await this.uploadService.post("/upload", image);
    } catch {}
  };
}

export const ChatService = new Chat();
