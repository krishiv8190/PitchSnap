import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className="text-white">
            <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
                <h1 className="md:text-5xl sm:text-3xl text-2xl font-bold md:py-6">
                Welcome to the AI-powered Pitch Deck Summary Generator                </h1>
                <div className="flex flex-col items-center">
                    <p className="md:text-3xl sm:text-2xl text-xl font-bold py-10">
                    Input your pitch deck text, and our advanced natural language processing model will generate a concise and informative summary for your presentation.                    </p>
                    
                </div>
                <div>
                    <Link to="/prompt">
                    <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
                        Get Started
                    </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default Hero;
