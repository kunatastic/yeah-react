import { Link, navigate } from "raviger";
import React, { useContext } from "react";
import logo from "../../logo.svg";
import { UserLoginContext } from "../../util/LoginContext";

function HeaderLink(loggedIn: boolean, logoutLogic: () => void) {
  console.log(loggedIn);
  if (loggedIn) {
    return [
      { label: "Home", route: "/" },
      { label: "About", route: "/about" },
      { label: "List", route: "/list" },
      {
        label: "Logout",
        onClick: () => {
          localStorage.removeItem("token");
          logoutLogic();
          navigate("/login");
        },
      },
    ];
  }
  return [
    { label: "Home", route: "/" },
    { label: "About", route: "/about" },
    { label: "List", route: "/list" },
    { label: "Login", route: "/login" },
  ];
}

function Header() {
  const { user, setUser } = useContext(UserLoginContext);
  return (
    <>
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" className="w-32 h-32 animate-spin" />
        <div className="flex gap-2 items-center">
          {console.log(user)}
          {HeaderLink(user !== null && user.username !== "", setUser).map((item, index) => (
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
