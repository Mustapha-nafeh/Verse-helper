import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    // State to control the mobile menu visibility and Riddles dropdown
    const [isOpen, setIsOpen] = useState(false);
    const [isRiddlesMenuOpen, setIsRiddlesMenuOpen] = useState(false);

    // Refs to detect clicks outside of the dropdown and mobile menu
    const menuRef = useRef(null);
    const mobileMenuButtonRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Function to toggle the Riddles dropdown menu on click
    const toggleRiddlesMenu = () => {
        setIsRiddlesMenuOpen(!isRiddlesMenuOpen);
    };

    // Close dropdown if clicked outside of the menu or mobile menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close the Riddles dropdown if clicked outside
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsRiddlesMenuOpen(false);
            }

            // Close the mobile menu if clicked outside
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !mobileMenuButtonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        // Adding event listener to document to listen for clicks outside
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-black text-white py-4 px-6 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-pink-500 text-2xl font-bold">
                    <Link to="/">Quran Riddle</Link>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 mr-12">
                    <li className="hover:-translate-y-1 hover:font-bold transform transition duration-300">
                        <Link
                            to="/"
                            className="hover:text-pink-500 transition duration-300"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="hover:-translate-y-1 hover:font-bold transform transition duration-300">
                        <Link
                            to="/pages"
                            className="hover:text-pink-500 transition duration-300"
                        >
                            Pages
                        </Link>
                    </li>
                    <li
                        ref={menuRef} // Added ref for detecting outside clicks
                        className="relative cursor-pointer hover:text-pink-500 transition duration-300"
                        onClick={toggleRiddlesMenu} // Toggle on click
                    >
                        Riddles
                        {/* Riddles Dropdown Menu */}
                        {isRiddlesMenuOpen && (
                            <div className="absolute -left-6 mt-2 w-32 bg-gray-400 bg-opacity-30 text-white rounded-md shadow-lg overflow-hidden transition-opacity ease-in-out duration-300 z-50">
                                <Link
                                    to="/riddles/by-page"
                                    className="block px-4 py-2 hover:bg-pink-500 transition duration-300"
                                    onClick={() => setIsRiddlesMenuOpen(false)} // Close menu on click
                                >
                                    By Page
                                </Link>
                                <Link
                                    to="/riddles/by-verse"
                                    className="block px-4 py-2 hover:bg-pink-500 transition duration-300"
                                    onClick={() => setIsRiddlesMenuOpen(false)} // Close menu on click
                                >
                                    By Verse
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        ref={mobileMenuButtonRef} // Added ref for detecting outside clicks
                        id="mobile-menu-button"
                        className="focus:outline-none text-pink-500"
                        onClick={toggleMenu}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Toggle visibility based on `isOpen`) */}
            <div
                ref={mobileMenuRef} // Added ref for detecting outside clicks
                className={`${
                    isOpen ? "block animate-fadeIn" : "hidden"
                } md:hidden bg-black bg-opacity-50`}
            >
                <ul className="flex flex-col items-center space-y-4 py-4">
                    <li>
                        <Link
                            to="/"
                            className="hover:text-pink-500 transition duration-300"
                            onClick={() => setIsOpen(false)} // Close menu on click
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/pages"
                            className="hover:text-pink-500 transition duration-300"
                            onClick={() => setIsOpen(false)} // Close menu on click
                        >
                            Pages
                        </Link>
                    </li>
                    <li
                        // ref={menuRef} // Added ref for detecting outside clicks
                        className="relative cursor-pointer hover:text-pink-500 transition duration-300"
                        onClick={toggleRiddlesMenu} // Toggle on click
                    >
                        Riddles
                        {/* Riddles Dropdown Menu */}
                        {isRiddlesMenuOpen && (
                            <div className="absolute -left-6 mt-2 w-32 bg-gray-400 bg-opacity-30 text-white rounded-md shadow-lg overflow-hidden transition-opacity ease-in-out duration-300 z-50">
                                <Link
                                    to="/riddles/by-page"
                                    className="block px-4 py-2 hover:bg-pink-500 transition duration-300"
                                    onClick={() => {
                                        setIsRiddlesMenuOpen(false);
                                        setIsOpen(false);
                                    }} // Close menu on click
                                >
                                    By Page
                                </Link>
                                <Link
                                    to="/riddles/by-verse"
                                    className="block px-4 py-2 hover:bg-pink-500 transition duration-300"
                                    onClick={() => {
                                        setIsRiddlesMenuOpen(false);
                                        setIsOpen(false);
                                    }} // Close menu on click
                                >
                                    By Verse
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
