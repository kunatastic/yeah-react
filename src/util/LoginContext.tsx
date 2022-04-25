import React, { createContext, useEffect, useState } from "react";
import { UserType } from "../types/UserTypes";
import { me } from "./ApiUtils";

export const UserLoginContext = createContext<{
  user: UserType | null;
  setUser: () => void;
}>({ user: null, setUser: () => {} });

function LoginProvider(props: { children: React.ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);

  async function getCurrentUser() {
    const currentUser = await me();
    console.log("HEADER:", currentUser);
    setLoggedInUser(currentUser);
  }

  useEffect(() => {
    console.log("LoginContext: useEffect");
    getCurrentUser();
  }, []);

  return (
    <UserLoginContext.Provider value={{ user: loggedInUser, setUser: getCurrentUser }}>
      {props.children}
    </UserLoginContext.Provider>
  );
}

export default LoginProvider;
