import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getMe, logOutServic } from "../services/auth/auth.service";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [infoUser, setInfoUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getInfoUser = async () => {
    try {
      setIsLoading(true);

      const infoUser = await getMe();

      setInfoUser(infoUser.data.data.user);
    } catch (error) {
      console.log("getInfoUser", error);
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

      toast.promise(logOutServic(), {
        loading: "در حال انجام عملیات",
        success: () => {
          setInfoUser(null);
          navigate("/login", { replace: true });

          return "باموفقیت خارج شدید";
        },
      });
    } catch (error) {
      console.log("AuthProvider", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    await getInfoUser();
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
