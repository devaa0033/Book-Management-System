'use client';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';  
import { AuthContext } from '@/context/authContext';

export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {currentUser} = useContext(AuthContext);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <>
            <nav className="flex items-center justify-between bg-white px-4 py-2 rounded-t-md gap-4 shadow">
                <div className="flex items-center">
                    <a className="text-gray-800 text-xl font-bold no-underline" href="#">
                        Library Management System
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                        🔍
                    </button>
                    <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-full max-w-xs w-56">
                        <span className="text-gray-500 mr-2">🔍</span>
                        <label className="sr-only" htmlFor="submenuInput">Search</label>
                        <input
                            type="search"
                            id="submenuInput"
                            placeholder="Search"
                            className="bg-transparent w-full outline-none text-sm"
                        />
                    </div>
                    <div className="relative">
                        <button type="button" className="flex items-center focus:outline-none" onClick={toggleDropdown}>
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                    src={currentUser.profilePic}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </button>
                        <ul className={`absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md text-sm ${dropdownOpen ? 'block' : 'hidden'}`}>
                            {currentUser ? (
                                    <li className="flex items-center gap-3 p-3 border-b">
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                            <img
                                                src= {currentUser.profilePic}
                                                alt="avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h6 className="font-semibold text-gray-800">{currentUser.name}</h6>
                                            <small className="text-gray-500">{currentUser.role}</small>
                                        </div>
                                    </li>
                            ) : (
                                <li>No users found</li>
                            )}
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">👤 My Profile</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">⚙️ Settings</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">💰 Billing</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">❓ FAQs</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-red-600 hover:bg-red-50">🚪 Sign out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="bg-white w-full py-2 px-4">
                <ul className="flex gap-4 text-base text-gray-700">
                    <li><a href="#" className="hover:underline">Books List</a></li>
                    <li><a href="#" className="hover:underline">Add Book</a></li>
                    <li><a href="#" className="hover:underline">Issued Books</a></li>
                </ul>
            </div>
        </>
    );
}
