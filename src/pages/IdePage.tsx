import React from "react";
import Editor from "../components/sections/ide/Editor";

const IdePage: React.FC = () => {
  return (
    <div className="px-4 m-4 md:px-8 lg:px-16"><Editor bg={true} /></div>
  );
};

export default IdePage;

