import React from "react";
import {
    BookOpen,
    Brain,
    Users,
    Star,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div className="relative overflow-hidden animate-fadeIn">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
                    <div className="text-center flex flex-col items-center">
                        <h1 className="text-3xl font-bold text-white mb-6">
                            Quran Page/verse{" "}
                            <span className="text-pink-500">Challenge</span>
                        </h1>
                        <p className="text-xl text-pink-200 mb-8 max-w-2xl mx-auto">
                            Enhance your Quranic memorization through an
                            engaging and interactive experience
                        </p>
                        <div className="flex gap-x-4">
                            <Link
                                to="/riddles/by-page"
                                className=" bg-pink-500 text-white px-8 py-2 rounded-lg text-lg  hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-pink-500/20"
                            >
                                Riddle by page number
                            </Link>
                            <Link
                                to="/riddles/by-verse"
                                className=" bg-pink-500 text-white px-8 py-2 rounded-lg text-lg  hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-pink-500/20"
                            >
                                Riddle by verse key
                            </Link>
                            <Link
                                to="/riddles/random"
                                className=" bg-pink-500 text-white px-8 py-2 rounded-lg text-lg  hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-pink-500/20"
                            >
                                Riddle by Random verse
                            </Link>
                            {/* <Link
                                to="/riddles/random"
                                className=" bg-pink-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-pink-500/20"
                            >
                                Riddle by a random verse
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* the image component from before */}

            {/* How It Works Section */}
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    How It <span className="text-pink-500">Works</span>
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        {
                            title: "Generate",
                            description:
                                "Click to get a random page number from the Quran",
                            icon: <BookOpen className="w-6 h-6" />,
                        },
                        {
                            title: "Think",
                            description:
                                "Try to recall the verses during the countdown",
                            icon: <Brain className="w-6 h-6" />,
                        },
                        {
                            title: "Reveal",
                            description:
                                "See if your memory recalls the page/verse",
                            icon: <Sparkles className="w-6 h-6" />,
                        },
                        {
                            title: "Learn",
                            description:
                                "View all verses and improve your memory",
                            icon: <Star className="w-6 h-6" />,
                        },
                    ].map((step, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-b from-pink-500/30 to-pink-500/5 rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                        >
                            <div className="bg-pink-500/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {step.title}
                            </h3>
                            <p className="text-pink-200">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Features Section */}

            {/* <div className="bg-gradient-to-b from-pink-500/5 to-transparent animate-fadeIn">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        Perfect for{" "}
                        <span className="text-pink-500">Everyone</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Huffaz",
                                description:
                                    "Master your memorization with verse challenges",
                                icon: <BookOpen className="w-6 h-6" />,
                            },
                            {
                                title: "Students",
                                description:
                                    "Begin to memorize the Quran by page number",
                                icon: <Users className="w-6 h-6" />,
                            },
                            // {
                            //     title: "Daily Practice",
                            //     description:
                            //         "Make revision an enjoyable daily habit",
                            //     icon: <Star className="w-6 h-6" />,
                            // },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-b from-pink-500/30 to-pink-500/5 rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                            >
                                <div className="bg-pink-500/40 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-pink-200 mb-4">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* Call to Action */}
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div className="bg-gradient-to-r from-pink-500/10 via-pink-500/20 to-pink-500/10 rounded-2xl p-12">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Challenge Yourself?
                    </h2>
                    <p className="text-pink-200 mb-8 max-w-2xl mx-auto">
                        Join thousands of others in strengthening their
                        connection with the Quran through active recall and
                        practice.
                    </p>
                    <button className="bg-pink-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-pink-500/20">
                        Start Your Journey
                    </button>
                </div>
            </div> */}

            {/* Footer */}
            {/* <footer className="border-t border-pink-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center text-pink-200">
                        Built with ❤️ for the Ummah
                    </p>
                </div>
            </footer> */}
        </div>
    );
};

export default LandingPage;
