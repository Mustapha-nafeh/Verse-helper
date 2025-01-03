import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomRiddler = () => {
    const [pageNumber, setPageNumber] = useState(null);
    const [pageData, setPageData] = useState(null);
    const [secondPageData, setSecondPageData] = useState(null);
    const [surahData, setSurahData] = useState(null);
    const [secondSurahData, setSecondSurahData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSecondExpanded, setIsSecondExpanded] = useState(false);
    const [countdown, setCountdown] = useState();
    const [isRevealed, setIsRevealed] = useState(false);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(604);
    const [randomVerseIndex, setRandomVerseIndex] = useState();

    const generateRandomPage = () => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const fetchVerses = async (page) => {
        setIsFetching(true);
        setPageData(null);

        try {
            const pageResponse = await axios({
                method: "get",
                url: `https://api.quran.com/api/v4/quran/verses/uthmani?page_number=${page}`,
                headers: {
                    Accept: "application/json",
                },
            });
            setPageData(pageResponse.data);
            let surah_id = pageResponse.data.verses[0].verse_key.split(":")[0];
            const surahResponse = await axios({
                method: "get",
                url: `https://api.quran.com/api/v4/chapters/${surah_id}`,
                headers: {
                    Accept: "application/json",
                },
            });
            setSurahData(surahResponse.data);

            const secondPageResponse = await axios({
                method: "get",
                url: `https://api.quran.com/api/v4/quran/verses/uthmani?page_number=${
                    page + 1
                }`,
                headers: {
                    Accept: "application/json",
                },
            });
            setSecondPageData(secondPageResponse.data);
            let second_surah_id =
                secondPageResponse.data.verses[0].verse_key.split(":")[0];
            const secondSurahResponse = await axios({
                method: "get",
                url: `https://api.quran.com/api/v4/chapters/${second_surah_id}`,
                headers: {
                    Accept: "application/json",
                },
            });
            setSecondSurahData(secondSurahResponse.data);

            // Generate random verse in the fetched page
            setRandomVerseIndex(
                Math.floor(Math.random() * pageResponse.data.verses.length)
            );

            setIsFetching(false);
        } catch (error) {
            console.error(error);
            setPageData({
                verses: [
                    {
                        text_uthmani:
                            "Error fetching verses. Please try again.",
                    },
                ],
            });
            setIsFetching(false);
        }
    };

    const handleButtonClick = () => {
        setIsRevealed(true);
        setIsExpanded(false);
        const page = generateRandomPage();
        setPageNumber(page);
        // setCountdown(3);
        fetchVerses(page);
    };

    // useEffect(() => {
    //     let timer;
    //     if (countdown > 0) {
    //         timer = setTimeout(() => {
    //             setCountdown(countdown - 1);
    //             if (countdown === 1) {
    //                 setIsRevealed(true);
    //             }
    //         }, 1000);
    //     }
    //     return () => clearTimeout(timer);
    // }, [countdown]);

    const arabicStyle = {
        direction: "rtl",
        fontFamily: "Arial, sans-serif",
        lineHeight: "2",
    };

    return (
        <div className="min-h-screen flex flex-col items-center mt-[5%] bg-black text-pink-500 animate-fadeIn">
            <div className="max-w-4xl w-full">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Riddle the page
                </h1>

                <div className="flex justify-center space-x-4 mb-4">
                    <div className="flex flex-col items-center space-y-4">
                        <label className="text-white">
                            Min:
                            <input
                                type="number"
                                value={min || ""}
                                onChange={(e) => setMin(Number(e.target.value))}
                                className="text-black ml-2 p-1 rounded"
                            />
                        </label>
                        <label className="text-white">
                            Max:
                            <input
                                type="number"
                                value={max || ""}
                                onChange={(e) => setMax(Number(e.target.value))}
                                className="text-black ml-2 p-1 rounded"
                            />
                        </label>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={handleButtonClick}
                        className="bg-pink-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-pink-700 transition"
                    >
                        Generate a random verse
                    </button>

                    {/* {pageNumber && countdown > 0 && (
                        <div className="w-full">
                            <div
                                className="border border-pink-500 rounded-lg p-4 cursor-pointer hover:bg-pink-950/20 transition-all duration-300 my-5"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                <h2 className="font-semibold text-xl mb-4 text-white">
                                    Page {pageNumber}
                                </h2>
                                <div className="flex justify-center w-full animate-pulse text-5xl">
                                    {countdown}
                                </div>
                            </div>
                        </div>
                    )} */}

                    {pageNumber && isRevealed && (
                        <div className="w-full">
                            <div
                                className="border border-pink-500 rounded-lg p-4 cursor-pointer hover:bg-pink-950/20 transition-all duration-300 my-5"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? (
                                    <h2 className="font-semibold text-xl mb-4 text-white">
                                        Page {pageNumber} -{" "}
                                        {surahData?.chapter?.name_arabic}
                                    </h2>
                                ) : (
                                    <h2 className="font-semibold text-xl mb-4 text-white">
                                        Page {pageNumber}
                                    </h2>
                                )}

                                {isFetching ? (
                                    <p className="text-center">
                                        Loading verses...
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {isExpanded ? (
                                            <div className="space-y-4">
                                                {pageData?.verses?.map(
                                                    (verse, index) => (
                                                        <div
                                                            key={
                                                                verse.id ||
                                                                index
                                                            }
                                                            className={`flex flex-col border border-pink-500 p-3 rounded-lg ${
                                                                index ===
                                                                randomVerseIndex
                                                                    ? "bg-pink-200"
                                                                    : "bg-white"
                                                            }`}
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <strong className="text-sm font-semibold text-black flex">
                                                                    Verse No.{" "}
                                                                    <span className="text-pink-500 ml-1">
                                                                        {index +
                                                                            1}
                                                                    </span>
                                                                    <span className="text-pink-500">
                                                                        &nbsp;(
                                                                        {verse.verse_key ||
                                                                            `${
                                                                                index +
                                                                                1
                                                                            }`}
                                                                        )
                                                                    </span>
                                                                </strong>
                                                            </div>
                                                            <span
                                                                className="font-bold text-lg text-black mt-2"
                                                                style={
                                                                    arabicStyle
                                                                }
                                                            >
                                                                {
                                                                    verse.text_uthmani
                                                                }
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <p
                                                    className="text-center font-bold text-lg text-pink-300"
                                                    style={arabicStyle}
                                                >
                                                    {pageData?.verses?.[
                                                        randomVerseIndex
                                                    ]?.text_uthmani ||
                                                        "No verses found."}
                                                </p>
                                                <p className="text-center text-white text-lg mt-4 ">
                                                    GUESS THE NEXT VERSE
                                                </p>
                                                <p className="text-center text-white text-xs mt-4 ">
                                                    Click to reveal answer
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* SECOND PAGE */}
                <div className="flex flex-col items-center space-y-4">
                    {pageNumber && isRevealed && (
                        <div className="w-full">
                            <div
                                className="border border-pink-500 rounded-lg p-4 cursor-pointer hover:bg-pink-950/20 transition-all duration-300 mb-10"
                                onClick={() =>
                                    setIsSecondExpanded(!isSecondExpanded)
                                }
                            >
                                {isSecondExpanded ? (
                                    <h2 className="font-semibold text-xl mb-4 text-white">
                                        Page {pageNumber + 1} -{" "}
                                        {secondSurahData?.chapter?.name_arabic}
                                    </h2>
                                ) : (
                                    <h2 className="font-semibold text-xl mb-4 text-white">
                                        Page {pageNumber + 1}
                                    </h2>
                                )}

                                {isFetching ? (
                                    <p className="text-center">
                                        Loading verses...
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {isSecondExpanded ? (
                                            <div className="space-y-4">
                                                {secondPageData?.verses?.map(
                                                    (verse, index) => (
                                                        <div
                                                            key={
                                                                verse.id ||
                                                                index
                                                            }
                                                            className="flex flex-col border border-pink-500 p-3 rounded-lg bg-white"
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <strong className="text-sm font-semibold text-black flex">
                                                                    Verse No.{" "}
                                                                    <span className="text-pink-500 ml-1">
                                                                        {index +
                                                                            1}
                                                                    </span>
                                                                    <span className="text-pink-500">
                                                                        &nbsp;(
                                                                        {verse.verse_key ||
                                                                            `${
                                                                                index +
                                                                                1
                                                                            }`}
                                                                        )
                                                                    </span>
                                                                </strong>
                                                            </div>
                                                            <span
                                                                className="font-bold text-lg text-black mt-2"
                                                                style={
                                                                    arabicStyle
                                                                }
                                                            >
                                                                {
                                                                    verse.text_uthmani
                                                                }
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-center text-white text-xs mt-4 ">
                                                    Click to expand page
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RandomRiddler;
