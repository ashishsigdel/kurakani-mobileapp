import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./GlobalProvider";
import { apiURL } from "./apiServices";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: number[];
}

export const SocketContext = createContext<SocketContextType | any>(undefined);

export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: React.ReactNode;
}
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const socketInstance = io(apiURL, {
        query: {
          userId: user.id,
        },
      });
      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users: number[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.close();
      };
    } else if (!user && socket) {
      socket.close();
      setSocket(null);
    }

    return () => socket?.close();
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
