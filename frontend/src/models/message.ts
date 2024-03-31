export interface MessageType {
  createAt: string;
  isSeen: boolean;
  messageContent: string;
  receiverID: number;
  senderID: number;
  id: string;
}
