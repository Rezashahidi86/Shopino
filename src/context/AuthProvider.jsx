import { createContext } from "react";
import { getMe, logOutServic } from "../services/auth/auth.service";
import { useState } from "react";
import { useEffect } from "react";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [infoUser, setInfoUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getInfoUser = async () => {
    try {
      setIsLoading(true);
      const infoUser = await getMe();
      setInfoUser(infoUser);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getInfoUser();
  }, []);

  const logOut = async () => {
    try {
      setIsLoading(true);
      const infoUser = await logOutServic();
      setInfoUser(null);
    } catch (error) {
      console.log("AuthProvider", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    getInfoUser();
  };
  const value = {
    infoUser,
    isLoading,
    logOut,
    getInfoUser,
    refreshUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
