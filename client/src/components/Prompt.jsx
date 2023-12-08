import React, { useState } from "react";
import axios from "axios";
import { RWebShare } from "react-web-share";

const Prompt = () => {
    const [promptText, setPromptText] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [savedSummaryId, setSavedSummaryId] = useState("");

    const handleInput = (e) => {
        setPromptText(e.target.value);
    };

    const handleSave = async () => {
        if (isSaved) {
            alert("Already Saved");
            return;
        }

        try {
            const requestBody = {
                promptEntered: promptText,
                generatedSummary: generatedText,
            };

            const serverUrl = process.env.REACT_APP_SERVER_URL;
            const response = await axios.post(
                `${serverUrl}/summary/saves`,
                requestBody
            );

            if (response.status === 200) {
                setIsSaved(true);
                const savedSummaryId = response.data.summary._id;
                setSavedSummaryId(savedSummaryId);
            } else {
                console.error("Save API call failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmit = async () => {
        setIsSaved(false);
        if (promptText.length === 0) {
            return;
        }
        setIsLoading(true);

        try {
            const req = {
                attributes_as_list: false,
                response_as_dict: true,
                type: "application/json",
                providers: "openai",
                temperature: 0.2,
                max_tokens: 100,
                text: `${promptText}.  Given a pitch deck describing a business, product, or idea, please generate a concise summary that captures the key points and highlights of the presentation.`,
            };
            const apiKey = process.env.REACT_APP_API_KEY;
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            };
            const url = process.env.REACT_APP_API_URL;
            const res = await axios.post(url, req, { headers });

            if (res.status === 200) {
                console.log(res.data.openai);
                setGeneratedText(res.data.openai.generated_text);
            } else {
                console.error("Axios error occured");
            }
        } catch (err) {
            console.error("Error", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        window.print();
    };

    return (
        <section className="p-5 sm:p-20 items-center">
            <div className="container mx-auto p-4 ">
                <div className="p-6 rounded-lg ">
                    <h2 className="text-white font-semibold text-xl mb-12">
                        Enter Pitch Deck Text :{" "}
                    </h2>

                    <textarea
                        type="text"
                        className="bg-[#323233] w-full border border-gray-300 rounded-xl p-4 mb-4 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white"
                        placeholder="Introducing our groundbreaking product..."
                        required
                        value={promptText}
                        onChange={handleInput}
                    />

                    <button
                        className={`bg-[#00df9a] text-black font-semibold uppercase px-4 py-2 rounded-lg hover:bg-blue-600 ${
                            isLoading ? "cursor-not-allowed" : ""
                        }`}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "GENERATING..." : "Generate Text"}
                    </button>

                    {generatedText && !isLoading && (
                        <div className="mt-4 ">
                            <div className="mt-4">
                                <h3 className="text-white text-center text-3xl font-semibold mb-6">
                                    Generated Summary:
                                </h3>
                                <p
                                    className="text-xl text-[#E2DFD2] break-words"
                                    style={{ maxWidth: "100%" }}
                                >
                                    {generatedText}
                                </p>
                            </div>
                            <button
                                className="bg-[#00df9a] font-semibold text-black uppercase px-4 py-2 rounded-md hover:bg-gray-600 mr-3 mt-5"
                                onClick={handleSave}
                                disabled={isSaved}
                            >
                                {isSaved ? "Saved" : "Save"}
                            </button>

                            <button
                                className="bg-[#00df9a] text-black uppercase font-semibold px-4 py-2 rounded-md hover:bg-gray-600 mr-3 mt-5"
                                onClick={handleDownload}
                            >
                                Download
                            </button>

                            <RWebShare
                                data={{
                                    text: { generatedText },
                                    title: "PitchSnap - AI based Summary generator",
                                }}
                                onClick={() =>
                                    console.log("shared successfully!")
                                }
                            >
                                <button
                                    className="bg-[#00df9a] text-black uppercase font-semibold px-4 py-2 rounded-md hover:bg-gray-600 mr-3 mt-5"
                                    onClick={handleDownload}
                                >
                                    Share
                                </button>
                            </RWebShare>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Prompt;
