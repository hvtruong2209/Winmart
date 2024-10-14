import AxiosAPI from "./axios";

class Chat {
  service: any;
  uploadService: any;
  constructor() {
    this.service = AxiosAPI();
    this.uploadService = AxiosAPI(true);
  }

  getRoom = async () => {
    try {
      const response = await this.service.get(`/rooms`);
      return response;
    } catch {
      return [];
    }
  };

  getMessage = async (info: any) => {
    try {
      const response = await this.service.get(
        `/messages/room/getmessagebyroomid/roomId=${info.roomId}/page=${info.page}`
      );
      return response;
    } catch {
      return [];
    }
  };

  sendMessage = async (message: any) => {
    try {
      await this.service.post("/messages", message);
    } catch {}
  };

  upload = async (image: any) => {
    try {
      await this.service.post("/upload", image);
    } catch {}
  };
}

export const ChatService = new Chat();
