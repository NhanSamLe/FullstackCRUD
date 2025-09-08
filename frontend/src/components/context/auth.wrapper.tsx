import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./auth.context";
import type { AuthState } from "./auth.context";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: { email: "", name: "" },
  });
  const [appLoading, setAppLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
