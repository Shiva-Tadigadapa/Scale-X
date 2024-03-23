import React from "react";
import { Link } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import Sidebar from "../Sidebar";

const NavBar = () => {
  return (
    <div className=" flex gap-10">
      <Sidebar />
      <Link to="/">
        <div className="absolute flex items-center justify-center text-white top-5 right-[50%] transform translate-x-1/2">
          <button
            className="p-3 border-2 flex items-center justify-center gap-3 text-white border-zinc-800 rounded-xl"
            aria-label="toggle sidebar"
          >
            <h1>Go to Sample Data Set</h1>
            <IoHome />
          </button>
        </div>
      </Link>
      <Link to="/dataInput">
        <div className="absolute  flex  items-center justify-center text-white top-5 right-10">
          <button
            className="p-3 border-2  flex items-center justify-center gap-3   text-white border-zinc-800 rounded-xl"
            aria-label="toggle sidebar"
          >
            <h1>Add Price Data To DB</h1>
            <MdModeEditOutline />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
