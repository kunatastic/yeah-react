import React from "react";
import Header from "./Header";
import Noise from "./Noise";
interface IContainer {
  children: React.ReactNode;
}

const Container = (props: IContainer) => {
  const { children } = props;
  return (
    <div className="flex min-h-screen bg-gray-50 items-center">
      <Noise />
      <div
        className="px-8 w-2/5 py-4 mx-auto bg-white shadow-lg rounded-xl z-10"
        style={{ minHeight: "50vh" }}
      >
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Container;
