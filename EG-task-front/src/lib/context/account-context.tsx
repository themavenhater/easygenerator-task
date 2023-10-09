import { createContext, useContext, useState } from "react";
import { loginUser } from "../actions/login.action";
import { registerUser } from "../actions/register.action";
import { LoginData, RegistrationData } from "../types";
import { getUserByToken } from "../actions/get-me.action";

interface IUser {
  email: string;
  fullName: string;
  createdAt: string;
}

interface IAccountContext {
  user: IUser | null;
  access_token: string | null;
  handleRegister: (c: RegistrationData) => Promise<void>;
  handleLogin: (c: LoginData) => Promise<void>;
  handleLogout: () => void;
  refreshUserInfo: () => void;
}

const AccountContext = createContext<IAccountContext | null>(null);

interface AccountProviderProps {
  children?: React.ReactNode;
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const access_token = localStorage.getItem("access_token");

  const [userInfo, setUser] = useState(() => {
    if (access_token) {
      refreshUserInfo();
    }
    return null;
  });

  const handleLogin = (credentials: LoginData) =>
    new Promise<void>((resolve, reject) =>
      loginUser(credentials)
        .then((res) => {
          const { access_token, userInfo } = res.data;
          setUser(userInfo);
          localStorage.setItem("access_token", access_token);
          resolve();
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
    );

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("access_token", "");
  };

  const handleRegister = (credentials: RegistrationData) =>
    new Promise<void>((resolve, reject) =>
      registerUser(credentials)
        .then((res) => {
          const { access_token, userInfo } = res.data;
          setUser(userInfo);
          localStorage.setItem("access_token", access_token);
          resolve();
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
    );

  function refreshUserInfo() {
    getUserByToken(access_token as string)
      .then(({ data }) => setUser(data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUser(null);
        localStorage.setItem("access_token", "");
      });
  }

  return (
    <AccountContext.Provider
      value={{
        user: userInfo,
        handleLogin,
        handleLogout,
        handleRegister,
        refreshUserInfo,
        access_token,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);

  if (context === null) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
};
