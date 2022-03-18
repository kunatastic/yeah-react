import React from "react";

interface IContainer {
  children: React.ReactNode;
}

const Container = (props: IContainer) => {
  const { children } = props;
  return <div className="flex h-screen bg-gray-50 items-center">{children}</div>;
};

export default Container;
