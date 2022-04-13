import { navigate } from "raviger";

export const NavRoutes: NavRoutesType[] = [
  { label: "Home", route: "/" },
  { label: "List", route: "/list" },
  { label: "About", route: "/about" },
  { label: "Login", route: "/login" },
  {
    label: "Logout",
    onClick: () => {
      localStorage.removeItem("token");
      navigate("/login");
    },
  },
];

export type NavRoutesType = {
  label: string;
  route?: string;
  onClick?: () => void;
};
