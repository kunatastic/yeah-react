import React from "react";
import logo from "../logo.svg";

interface IHeaderprops {
  title: string;
}

function Header(props: IHeaderprops) {
  const { title } = props;
  return (
    <>
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" className="w-32 h-32 animate-spin" />
        <h1 className="text-center font-bold text-xl flex-1">{title}</h1>
      </div>
    </>
  );
}

export default Header;
