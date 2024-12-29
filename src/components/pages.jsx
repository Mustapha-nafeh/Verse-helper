import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaBookOpen } from "react-icons/fa"; // Font Awesome Icons

const QuranPages = () => {
    const [pages, setPages] = useState([]);
    const [expandedAccordion, setExpandedAccordion] = useState(null);
    const [expandedPages, setExpandedPages] = useState({});
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    const arabicStyle = {
        direction: "rtl",
        textAlign: "right",
        lineHeight: "2",
        letterSpacing: "0.01em",
    };

    const fetchPage = useCallback(async (pageNumber) => {
        try {
            const response = await axios.get(
                `https://api.quran.com/api/v4/quran/verses/uthmani?page_number=${pageNumber}`
            );
            return { pageNumber, verses: response.data.verses };
        } catch (error) {
            console.error(`Error fetching page ${pageNumber}:`, error);
            return { pageNumber, verses: [] };
        }
    }, []);

    const handleExpandAccordion = async (accordionIndex) => {
        setExpandedAccordion(
            expandedAccordion === accordionIndex ? null : accordionIndex
        );

        if (expandedAccordion !== accordionIndex) {
            const startPage = accordionIndex * 100 + 1;
            const endPage = Math.min((accordionIndex + 1) * 100, 606);
            let currentBatchStart = startPage;

            while (currentBatchStart <= endPage) {
                const pagesToLoad = Array.from(
                    { length: Math.min(20, endPage - currentBatchStart + 1) },
                    (_, i) => currentBatchStart + i
                );

                const loadedPages = await Promise.all(
                    pagesToLoad.map((pageNumber) => fetchPage(pageNumber))
                );

                setPages((prev) => {
                    const updatedPages = [...prev];
                    loadedPages.forEach(({ pageNumber, verses }) => {
                        updatedPages[pageNumber - 1] = { pageNumber, verses };
                    });
                    return updatedPages;
                });

                currentBatchStart += 20;
            }
        }
    };

    const handleExpandPage = async (pageNumber) => {
        if (!pages[pageNumber - 1]?.verses?.length) {
            const newPageData = await fetchPage(pageNumber);
            setPages((prev) => {
                const updatedPages = [...prev];
                updatedPages[pageNumber - 1] = newPageData;
                return updatedPages;
            });
        }
        setExpandedPages((prev) => ({
            ...prev,
            [pageNumber]: !prev[pageNumber],
        }));
    };

    const backgrounds = ["muslim.jpg", "muslim (2).jpg", "muslim (3).jpg"];

    useEffect(() => {
        const initializePages = () => {
            const placeholders = Array.from({ length: 606 }, (_, i) => ({
                pageNumber: i + 1,
                verses: [],
            }));
            setPages(placeholders);
        };
        initializePages();

        const interval = setInterval(() => {
            setBackgroundIndex(
                (prevIndex) => (prevIndex + 1) % backgrounds.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col items-center mt-[5%] animate-fadeIn p-4">
            <h1 className="text-center text-4xl font-bold text-white mb-6 shadow-lg">
                Quran Pages
            </h1>
            <div className="w-full max-w-5xl">
                {[...Array(6)].map((_, accordionIndex) => (
                    <div
                        key={accordionIndex}
                        className="mb-4 border rounded-lg overflow-hidden shadow-2xl"
                    >
                        <div
                            className="bg-gradient-to-r from-pink-700 to-white text-white px-4 py-2 font-semibold cursor-pointer"
                            onClick={() =>
                                handleExpandAccordion(accordionIndex)
                            }
                        >
                            Pages {accordionIndex * 100 + 1} -{" "}
                            {(accordionIndex + 1) * 100}
                        </div>
                        {expandedAccordion === accordionIndex && (
                            <div className="bg-white p-4 animate-fadeIn">
                                {[...Array(100)].map((_, pageIndex) => {
                                    const pageNumber =
                                        accordionIndex * 100 + pageIndex + 1;
                                    if (pageNumber > 606) return null;

                                    const pageData =
                                        pages[pageNumber - 1] || {};
                                    const firstVerse =
                                        pageData.verses?.[0]?.text_uthmani ||
                                        "";

                                    return (
                                        <div
                                            key={pageNumber}
                                            className="border mb-2 p-4 rounded cursor-pointer hover:bg-gray-100 transition-all duration-300"
                                            onClick={() =>
                                                handleExpandPage(pageNumber)
                                            }
                                        >
                                            <h2 className="font-semibold text-lg text-gray-800">
                                                Page {pageNumber}
                                            </h2>
                                            <p className="text-md text-blacks font-bold animate-fadeIn">
                                                {firstVerse}
                                            </p>
                                            {expandedPages[pageNumber] && (
                                                <div className="mt-2 shadow-lg">
                                                    {pageData.verses?.map(
                                                        (verse, index) => (
                                                            <p
                                                                key={verse.id}
                                                                className="flex flex-col border border-1 border-pink-500 p-3 rounded-lg "
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <FaBookOpen className="text-black text-md" />
                                                                    <strong className="text-sm font-semibold text-black flex">
                                                                        Verse{" "}
                                                                        No.{" "}
                                                                        <span className="text-pink-500">
                                                                            {index +
                                                                                1}
                                                                        </span>
                                                                        <span className="text-pink-500">
                                                                            &nbsp;
                                                                            {
                                                                                "("
                                                                            }
                                                                            {
                                                                                verse.verse_key
                                                                            }
                                                                            {
                                                                                ")"
                                                                            }
                                                                        </span>
                                                                    </strong>
                                                                </div>

                                                                <span
                                                                    className="font-bold text-lg text-black"
                                                                    style={
                                                                        arabicStyle
                                                                    }
                                                                >
                                                                    {
                                                                        verse.text_uthmani
                                                                    }
                                                                </span>
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuranPages;
