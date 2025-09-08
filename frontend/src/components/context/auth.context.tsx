import { createContext } from "react";

export type AuthState = {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type AuthContextType = {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  appLoading: boolean;
  setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
