import React from "react";
import { Provider } from "react-redux";
import store from "./features/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuranPages from "./components/pages";
import VerseRiddler from "./components/verse-riddler";
import Navbar from "./components/navbar";
import PageRiddler from "./components/page-riddler";
import LandingPage from "./components/home";
import NotFound from "./components/notfound";
import RandomRiddler from "./components/random-riddle";

const App = () => {
    return (
        <Provider store={store}>
            <Router basename="/Verse-helper">
                <div className="bg-black bg-gradient-to-b from-pink-500/10 to-transparent">
                    <Navbar />
                    <div className=" flex justify-around w-full">
                        <div className="justify-center w-[80%] ">
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/pages" element={<QuranPages />} />
                                <Route
                                    path="/riddles/by-verse"
                                    element={<VerseRiddler />}
                                />
                                <Route
                                    path="/riddles/by-page"
                                    element={<PageRiddler />}
                                />
                                <Route
                                    path="/riddles/random"
                                    element={<RandomRiddler />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
