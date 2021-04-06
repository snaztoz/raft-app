import { useContext, createContext } from "react";
import "firebase/auth";

import { useProvideAuth } from 'lib/internal/firebase'

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
