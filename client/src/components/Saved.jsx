import React, { useState, useEffect } from "react";
import axios from "axios";

const Saved = () => {
  const [likedSummary, setLikedSummary] = useState([]);

  const removeSummary = (summaryId) => {
    const url = process.env.REACT_APP_SERVER_URL;
    axios
      .post(`${url}/summary/deleteSummary`, {
        summaryId,
      })
      .then(() => {
        setLikedSummary((prevSummary) =>
        prevSummary.filter((summary) => summary.id !== summaryId)
        );
      })
      .catch((error) => {
        console.error("Error removing Summary:", error);
      });
  };

  useEffect(() => {
    const url = process.env.REACT_APP_SERVER_URL;
    axios
      .post(`${url}/summary/getSummary`)
      .then((response) => {
        setLikedSummary(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <section className="p-5 sm:p-20 items-center relative text-white">
      <div className="p-8 container">
        <h2 className="text-4xl text-center font-semibold mb-10">
          Saved Summaries
        </h2>
        <div className="space-y-16">
          {likedSummary.map((summary) => (
            <div
              key={summary.id}
              className="bg-[#323233] rounded-lg border-zinc-100 relative p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-semibold">{summary.prompt}</h2>
                <p className="text-lg">{summary.content}</p>
              </div>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-md px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => removeSummary(summary.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Saved;
