import React from "react";
import { useFormik } from "formik";
import { useRegister } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { mutate, isLoading, isError, error } = useRegister();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            mutate(values, {
                onSuccess: () => {
                    navigate("/login"); // Redirect to login page after successful registration
                },
            });
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-purple-600 text-center mb-6">
                    Register
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-2 text-white font-semibold rounded-md bg-purple-600 shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                            isLoading ? "opacity-50" : ""
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>

                    {/* Error Message */}
                    {isError && (
                        <div className="text-red-500 text-sm mt-4 text-center">
                            {error.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;
