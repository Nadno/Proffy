import React, { createContext, useState, useEffect } from "react";

import { getAccount, getToken, getRefreshToken } from "./Utils/account";

export interface User {
  account: {
    id: number;
    email: string;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
  };
  token: string | null;
  refreshToken: string | null;
}

interface Context {
  user: User;
  authenticated: Boolean;
}

const UserContext = createContext<Context | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({
    account: {
      id: 0,
      email: "",
      name: "",
      avatar: "",
      whatsapp: "",
      bio: "",
    },
    token: null,
    refreshToken: null,
  });


  useEffect(() => {
    const account = getAccount();
    const token = getToken();
    const refreshToken = getRefreshToken();
    
    if (account && token && refreshToken) {
      setUser({
        account,
        token,
        refreshToken,
      });
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ user, authenticated: user.token ? true : false }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, AuthProvider };
