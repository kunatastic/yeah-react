import React from "react";

interface IContainer {
  children: React.ReactNode;
}

const Container = (props: IContainer) => {
  const { children } = props;
  return <div className="flex min-h-screen py-20 bg-gray-50 items-center">{children}</div>;
};

export default Container;
