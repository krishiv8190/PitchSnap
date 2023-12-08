import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const closeNav = () => {
        setNav(false);
    };

    return (
        <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
            <Link to="/">
                <h1 className="w-full text-4xl font-bold text-[#00df9a] ">
                    PitchSnap
                </h1>
            </Link>
            <ul className="hidden md:flex">
                <Link to="/saved" onClick={closeNav}>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Saved
                    </button>
                </Link>
                <Link to="/prompt" onClick={closeNav}>
                    <button
                        type="button"
                        className="text-white bg-[#00df9a] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-md px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Generate Summary
                    </button>
                </Link>
            </ul>
            <div onClick={handleNav} className="block md:hidden">
                {nav ? (
                    <AiOutlineClose size={20} />
                ) : (
                    <AiOutlineMenu size={20} />
                )}
            </div>
            <ul
                className={
                    nav
                        ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-20"
                        : "ease-in-out duration-500 fixed left-[-100%]"
                }
            >
                <Link to="/" onClick={closeNav}>
                    <h1 className="w-full text-4xl font-bold text-[#00df9a] m-4">
                        PitchSnap
                    </h1>
                </Link>
                <Link to="/saved" onClick={closeNav}>
                    <button
                        type="button"
                        className="text-white block md:hidden overflow-hidden bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-md px-9 py-2.5 mx-3 mt-3 w-[12rem] text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Saved
                    </button>
                </Link>
                <Link to="/prompt" onClick={closeNav}>
                    <button
                        type="button"
                        className="text-white block md:hidden bg-[#00df9a] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-md px-9 py-2.5 mx-3 mt-3 w-[12rem] text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Generate Summary
                    </button>
                </Link>
            </ul>
        </div>
    );
};

export default Navbar;
