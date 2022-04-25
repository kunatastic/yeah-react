import { Link } from "raviger";
import React from "react";
import logo from "../../logo.svg";

function Home() {
  return (
    <>
      <div className="flex items-center">
        <img className="h-48" src={logo} alt="react logo" />
        <p className="flex-1">Welcome to the homepage</p>
      </div>
      <div className="flex gap-2 items-center">
        <Link
          className="text-white w-full bg-blue-500 mx-2 px-4 text-center py-2 mt-4 rounded-lg hover:bg-blue-600"
          href="/list"
        >
          List 📜
        </Link>
      </div>
    </>
  );
}

export default Home;
