import React from "react";
import { Provider } from "react-redux";
import store from "./features/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuranPages from "./components/pages";
import VerseRiddler from "./components/verse-riddler";
import Navbar from "./components/navbar";
import PageRiddler from "./components/page-riddler";
import LandingPage from "./components/home";

const App = () => {
    return (
        <Provider store={store}>
            <Router basename="/Verse-helper">
                <div className="bg-black">
                    <Navbar />
                    <div className=" flex justify-around w-full">
                        <div className="justify-center w-[80%]">
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
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
