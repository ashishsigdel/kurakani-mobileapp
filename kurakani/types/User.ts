export type User = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  profilePic?: string;
  connectionStatus?: "sent" | "received" | "connected" | null;
};
