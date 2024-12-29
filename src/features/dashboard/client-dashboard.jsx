import React from "react";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <div className="w-64 bg-purple-600 text-white shadow-md p-5 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Movofit</h1>
                    <nav className="mt-10">
                        <ul>
                            <li className="mb-6">
                                <Link
                                    to="/dashboard"
                                    className="text-lg hover:text-purple-300"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li className="mb-6">
                                <Link
                                    to="/workouts"
                                    className="text-lg hover:text-purple-300"
                                >
                                    Workouts
                                </Link>
                            </li>
                            <li className="mb-6">
                                <Link
                                    to="/profile"
                                    className="text-lg hover:text-purple-300"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li className="mb-6">
                                <Link
                                    to="/settings"
                                    className="text-lg hover:text-purple-300"
                                >
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <button className="w-full bg-black text-white py-2 mt-5 rounded hover:bg-purple-700">
                        Log Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-10">
                <h2 className="text-2xl font-semibold text-black mb-5">
                    Dashboard Overview
                </h2>

                {/* Client Profile Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-semibold text-purple-600">
                        Your Profile
                    </h3>
                    <p className="text-lg">Name: John Doe</p>
                    <p className="text-lg">Goal: Weight Loss</p>
                    <p className="text-lg">Progress: 65%</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl text-purple-600">
                                Workouts Completed
                            </h3>
                            <p className="text-2xl font-bold">45</p>
                        </div>
                        <div className="bg-purple-200 p-3 rounded-full">
                            <i className="fas fa-dumbbell text-purple-600"></i>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl text-purple-600">
                                Calories Burned
                            </h3>
                            <p className="text-2xl font-bold">4,500</p>
                        </div>
                        <div className="bg-purple-200 p-3 rounded-full">
                            <i className="fas fa-fire text-purple-600"></i>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h3 className="text-xl text-purple-600">
                                Upcoming Sessions
                            </h3>
                            <p className="text-2xl font-bold">3</p>
                        </div>
                        <div className="bg-purple-200 p-3 rounded-full">
                            <i className="fas fa-calendar-check text-purple-600"></i>
                        </div>
                    </div>
                </div>

                {/* Recent Workouts */}
                <div className="mt-10">
                    <h3 className="text-xl font-semibold text-black mb-3">
                        Recent Workouts
                    </h3>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <ul>
                            <li className="mb-4">
                                <span className="text-purple-600 font-semibold">
                                    Leg Day
                                </span>{" "}
                                - Completed on Dec 15, 2024.
                            </li>
                            <li className="mb-4">
                                <span className="text-purple-600 font-semibold">
                                    Cardio Burn
                                </span>{" "}
                                - Completed on Dec 14, 2024.
                            </li>
                            <li>
                                <span className="text-purple-600 font-semibold">
                                    Upper Body Strength
                                </span>{" "}
                                - Completed on Dec 13, 2024.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Progress Insights */}
                <div className="mt-10">
                    <h3 className="text-xl font-semibold text-black mb-3">
                        Progress Insights
                    </h3>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-lg">
                            Great job! You're 65% closer to your goal. Keep up
                            the good work!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
