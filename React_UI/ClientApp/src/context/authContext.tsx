import React from "react";
import { AuthenticatedUser } from "../models/dto/authenicatedUser";

const AuthContext = React.createContext<AuthenticatedUser| null>(null);

export interface AuthContextProps {
  userData: AuthenticatedUser;
  children: JSX.Element;
};

export const AuthProvider = ({ userData, children }:AuthContextProps) => {
  let [user, setUser] = React.useState(userData);

  return (
    <AuthContext.Provider value={ user }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);