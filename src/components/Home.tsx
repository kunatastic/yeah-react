import React from "react";
import logo from "../logo.svg";

interface IHomeProps {
  changeStateCB: (state: string) => void;
}

function Home(props: IHomeProps) {
  const { changeStateCB } = props;
  return (
    <>
      <div className="flex items-center">
        <img className="h-48" src={logo} alt="react logo" />
        <p className="flex-1">Welcome to the homepage</p>
      </div>
      <button
        className="text-white w-full bg-blue-500 mx-2 px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
        onClick={() => changeStateCB("LIST")}
      >
        List 📜
      </button>
    </>
  );
}

export default Home;
