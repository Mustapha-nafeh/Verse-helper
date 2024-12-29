import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navigation items configuration
    const navItems = [
        { label: "Home", path: "/" },
        { label: "Pages", path: "/pages" },
        {
            label: "Riddles",
            children: [
                { label: "By Page", path: "/riddles/by-page" },
                { label: "By Verse", path: "/riddles/by-verse" },
            ],
        },
    ];

    // NavItem component for both desktop and mobile
    const NavItem = ({ item, mobile = false }) => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

        const closeMenus = () => {
            setIsMobileMenuOpen(false);
            setIsDropdownOpen(false);
        };

        if (item.children) {
            return (
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex items-center space-x-1 group ${
                            mobile ? "w-full justify-center py-2" : ""
                        }`}
                    >
                        <span className="hover:text-pink-500 transition duration-300">
                            {item.label}
                        </span>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                                isDropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div
                            className={`${
                                mobile
                                    ? "flex flex-col items-center space-y-2 w-full p-3 rounded-lg gap-2 "
                                    : "absolute -left-6 mt-2 w-32 rounded-md shadow-lg bg-black border border-pink-500/20"
                            } bg-gray-200 bg-opacity-20 `}
                        >
                            {item.children.map((child) => (
                                <Link
                                    key={child.path}
                                    to={child.path}
                                    onClick={closeMenus}
                                    className={`
                                        block whitespace-nowrap hover:text-pink-500 transition duration-300
                                        ${
                                            mobile
                                                ? ""
                                                : "px-4 hover:bg-pink-500/10"
                                        }
                                    `}
                                >
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                to={item.path}
                onClick={closeMenus}
                className={`
                    hover:text-pink-500 transition duration-300
                    ${mobile ? "py-2" : ""}
                `}
            >
                {item.label}
            </Link>
        );
    };

    return (
        <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-pink-500 text-2xl font-bold hover:text-pink-400 transition duration-300"
                    >
                        Quran Riddle
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8 mr-6">
                        {navItems.map((item) => (
                            <NavItem key={item.label} item={item} />
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-pink-500 hover:text-pink-400 transition duration-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-sm border-b-4 border-pink-500/20">
                    <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-center">
                        {navItems.map((item) => (
                            <div key={item.label} className="py-1">
                                <NavItem item={item} mobile={true} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
