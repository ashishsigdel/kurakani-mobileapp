export type ChatMessage = {
  conversationId: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  isSendByme: boolean;
  mediaURL: string | null;
  message: string;
  receiverId: string;
  senderId: string;
  updatedAt: string;
};
