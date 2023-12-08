import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Prompt from "./components/Prompt";
import Saved from "./components/Saved";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <div>
                    <Navbar />
                </div>
                <div>
                    <Routes>
                        <Route exact path="/" element={<Hero />}></Route>
                        <Route
                            exact
                            path="/prompt"
                            element={<Prompt />}
                        ></Route>
                        <Route
                            exact
                            path="/saved"
                            element={<Saved />}
                        ></Route>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
