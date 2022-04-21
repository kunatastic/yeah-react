import React, { useContext } from "react";
import { UserLoginContext } from "./LoginContext";

function ProtectRouteUtil(props: { children: JSX.Element }) {
  const { user } = useContext(UserLoginContext);
  if (user !== null && user.username !== "") {
    return props.children;
  }
  return <div>Kindly Login to Continue</div>;
}

export default ProtectRouteUtil;
