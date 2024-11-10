import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/User";

interface GuestContextType {
  resetToken: string | null;
  email: string | null;
  otp: string | null;
  sendOtp: (email: string, resetToken: string) => Promise<void>;
  verifyOtp: (email: string, resetToken: string, otp: string) => Promise<void>;
  resetAll: () => Promise<void>;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);
interface GuestProviderProps {
  children: ReactNode;
}
const GuestProvider = ({ children }: GuestProviderProps) => {
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const sendOtp = async (email: string, resetToken: string) => {
    try {
      await AsyncStorage.setItem("resetEmail", email);
      await AsyncStorage.setItem("resetToken", resetToken);

      setEmail(email);
      setResetToken(resetToken);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtp = async (email: string, resetToken: string, otp: string) => {
    try {
      await AsyncStorage.setItem("resetEmail", email);
      await AsyncStorage.setItem("resetToken", resetToken);
      await AsyncStorage.setItem("otp", otp);

      setEmail(email);
      setResetToken(resetToken);
      setOtp(otp);
    } catch (error) {
      console.log(error);
    }
  };

  const resetAll = async () => {
    try {
      await AsyncStorage.removeItem("resetEmail");
      await AsyncStorage.removeItem("resetToken");
      await AsyncStorage.removeItem("otp");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GuestContext.Provider
      value={{ email, otp, resetToken, sendOtp, verifyOtp, resetAll }}
    >
      {children}
    </GuestContext.Provider>
  );
};

const useGuest = () => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error("useGuest must be used in an GuestProvider");
  }
  return context;
};

export { GuestProvider, useGuest };
