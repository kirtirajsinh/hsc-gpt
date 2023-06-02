import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { GoHome } from "react-icons/go";

const Menu = () => {
  return (
    <>
      <div className="flex flex-col text-black h-screen w-64 ">
        <a
          href="#"
          className="flex flex-row items-center  h-16 hover:bg-s-bg rounded-r-full gap-4 pl-6 "
        >
          <GoHome className="w-6 h-6" />
          <i className="text-xl font-normal">Home</i>
        </a>
        <a
          href="#"
          className="flex flex-row items-center  h-16 hover:bg-s-bg rounded-r-full gap-4 pl-6"
        >
          <AiOutlineQuestionCircle className="w-6 h-6" />
          <i className="text-xl font-normal">FAQ</i>
        </a>
        <a
          href="#"
          className="flex flex-row items-center  h-16 hover:bg-s-bg rounded-r-full gap-4 pl-6"
        >
          <SlCalender className="w-6 h-6" />
          <i className="text-xl font-normal">Updates</i>
        </a>
      </div>
    </>
  );
};

export default Menu;
