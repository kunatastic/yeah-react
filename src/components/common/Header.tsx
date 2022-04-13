import { Link } from "raviger";
import React, { useEffect } from "react";
import { NavRoutes } from "../../data/NavRoutesData";
import logo from "../../logo.svg";
import { UserType } from "../../types/UserTypes";

function Header(props: { currentUser: UserType }) {
  const { currentUser } = props;

  return (
    <>
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" className="w-32 h-32 animate-spin" />
        <div className="flex gap-2 items-center">
          {NavRoutes.filter((item) => {
            if (item.label === "Logout") {
              if (currentUser === null) return false;
              if (currentUser?.username.length === 0) return false;
            }
            if (item.label === "Login") {
              if (currentUser?.username.length > 0) return false;
            }
            return true;
          }).map((item, index) => (
            <React.Fragment key={index}>
              {item.route && (
                <Link
                  href={item.route}
                  className={`text-gray-800 p-2 m-2 w-20 text-center uppercase bg-gray-200 hover:bg-blue-400 rounded-md shadow-md ${
                    window.location.pathname === item.route && "text-blue-700 bg-blue-100"
                  }`}
                >
                  {item.label}
                </Link>
              )}
              {item.onClick && (
                <button
                  onClick={item.onClick}
                  className={`text-gray-800 p-2 m-2 w-20 text-center uppercase bg-gray-200 hover:bg-blue-400 rounded-md shadow-md ${
                    window.location.pathname === item.route && "text-blue-700 bg-blue-100"
                  }`}
                  type="button"
                >
                  {item.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
