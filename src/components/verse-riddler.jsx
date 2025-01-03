import React, { useState, useEffect } from "react";
import axios from "axios";

const VerseRiddler = () => {
    const [verseKey, setVerseKey] = useState(null);
    const [verseText, setVerseText] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const [chapterVerses, setChapterVerses] = useState([]);

    useEffect(() => {
        // Fetch chapter details to know verse counts
        const fetchChapterDetails = async () => {
            try {
                const promises = Array.from({ length: 114 }, (_, i) =>
                    axios.get(`https://api.quran.com/api/v4/chapters/${i + 1}`)
                );
                const responses = await Promise.all(promises);
                const verses = responses.map(
                    (response) => response.data.chapter.verses_count
                );
                setChapterVerses(verses);
            } catch (error) {
                console.error("Error fetching chapter details", error);
            }
        };
        fetchChapterDetails();
    }, []);

    const generateRandomKey = () => {
        const surah = Math.floor(Math.random() * 114) + 1; // 1 to 114
        const maxAyah = chapterVerses[surah - 1] || 1; // Ensure valid range based on chapter
        const ayah = Math.floor(Math.random() * maxAyah) + 1; // 1 to maxAyah
        return `${surah}:${ayah}`;
    };

    const fetchVerse = async (key) => {
        setIsFetching(true);
        setVerseText(null);

        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=${key}`,
            headers: {
                Accept: "application/json",
            },
        };

        try {
            const response = await axios(config);
            const verse =
                response.data.verses[0]?.text_uthmani || "Verse not found.";
            setTimeout(() => {
                setVerseText(verse);
                setIsFetching(false);
            }, 5000); // Delay for suspense
        } catch (error) {
            console.error(error);
            setVerseText("Error fetching verse. Please try again.");
            setIsFetching(false);
        }
    };

    const handleButtonClick = () => {
        const key = generateRandomKey();
        setVerseKey(key);
        setVerseText(null);
        fetchVerse(key);
        // Countdown for suspense
        let timeLeft = 5; // 5 seconds countdown
        setCountdown(timeLeft);
        const interval = setInterval(() => {
            timeLeft -= 1;
            setCountdown(timeLeft);
            if (timeLeft === 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center mt-[18%] md:mt-[10%] text-white animate-fadeIn">
            <h1 className="text-3xl  text-pink-500 mb-6 ">Riddle the verse</h1>
            <button
                onClick={handleButtonClick}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-pink-700 transition"
            >
                Generate Verse Key
            </button>

            <p className="text-center text-white text-xs mt-2">
                Try to guess the verse
            </p>

            {verseKey && (
                <h2 className="text-2xl mt-4">
                    Verse Key: <span className="text-pink-300">{verseKey}</span>
                </h2>
            )}
            {countdown !== null && (
                <h3
                    className={`text-xl mt-4 ${
                        countdown === 1
                            ? "animate-fadeOut"
                            : countdown === 0
                            ? "hidden"
                            : ""
                    } `}
                >
                    Revealing in...{" "}
                    <span className="text-pink-300">{countdown}</span> seconds
                </h3>
            )}
            {/* {isFetching && !countdown && (
                <h3 className="text-xl mt-4">Revealing verse...</h3>
            )} */}
            {verseText && (
                <p className="text-xl font-medium text-center text-pink-200 mt-6 animate-fadeIn ">
                    {verseText}
                </p>
            )}
        </div>
    );
};

export default VerseRiddler;
