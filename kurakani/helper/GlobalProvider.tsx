import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/User";

interface AuthContextType {
  token: string | null;
  user: User | null;
  signIn: (accessToken: string, userData: User) => Promise<void>;
  loading: boolean;
  signOut: () => Promise<void>;
  updateUser: (userData: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode;
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // lod token and user from AsyncStorage
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("accessToken");
        const storedUser = await AsyncStorage.getItem("user");

        if (storedToken) {
          setToken(storedToken);
        }

        if (storedUser) {
          setUser(JSON.parse(storedUser) as User);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const signIn = async (accessToken: string, userData: User) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      setToken(accessToken);
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("user");

      setToken(null);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, signIn, loading, signOut, updateUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
