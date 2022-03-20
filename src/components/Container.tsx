import React from "react";
import Header from "./Header";

interface IContainer {
  children: React.ReactNode;
}

const Container = (props: IContainer) => {
  const { children } = props;
  return (
    <div className="flex min-h-screen py-20 bg-gray-50 items-center">
      <div className="px-8 w-2/5 py-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Container;
