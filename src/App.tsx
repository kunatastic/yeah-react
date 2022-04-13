import React, { useEffect, useState } from "react";

import AppRouter from "./router/AppRouter";
import { UserType } from "./types/UserTypes";
import { me } from "./util/ApiUtils";

async function getCurrentUser(setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>) {
  const currentUser = await me();
  setCurrentUser(currentUser);
}

function App() {
  const [currentUser, setCurrentUser] = useState<UserType>(null);

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return <AppRouter currentUser={currentUser} />;
}

export default App;
