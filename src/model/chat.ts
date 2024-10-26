export interface Message {
  id: number;
  avatar?: string;
  content?: string;
  fromFullName?: string;
  fromUserName?: string;
  userId?: number;
  roomId: number;
  timestamp: string;
}
