import { Link } from "raviger";
import React from "react";
import logo from "../logo.svg";

function Header() {
  return (
    <>
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" className="w-32 h-32 animate-spin" />
        <div className="flex gap-2 items-center">
          {[
            {
              label: "Home",
              route: "/",
            },
            {
              label: "List",
              route: "/list",
            },
            {
              label: "About",
              route: "/about",
            },
          ].map((item, index) => (
            <Link
              href={item.route}
              key={index}
              className={`text-gray-800 p-2 m-2 w-20 text-center uppercase bg-gray-200 hover:bg-blue-400 rounded-md shadow-md ${
                window.location.pathname === item.route ? "text-blue-700 bg-blue-100" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
