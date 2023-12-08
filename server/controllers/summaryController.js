const Summary = require("../models/summary");
const uuid = require("uuid");

exports.saves = (req, res) => {
    console.log("Upvote API called");

    const uniqueId = uuid.v4();
    const { promptEntered, generatedSummary } = req.body;

    const newSummary = new Summary({
        id: uniqueId,
        prompt: promptEntered,
        summary: generatedSummary,
    });

    newSummary.save().then((savedSummary) => {
        console.log("Summary saved successfully", savedSummary);
        res.status(200).json({
            message: "Summary saved successfully",
            summary: savedSummary,
        });
    });
};



exports.getSummary = (req, res) => {
    Summary.find().then((Summary) => {
        res.status(200).json(Summary);
    });
};



exports.deleteSummary = (req, res) => {
    console.log("Delete Summary API called");
    const { summaryId } = req.body;

    Summary.findOneAndDelete({ id: summaryId })
        .then((summaryDeleted) => {
            if (summaryDeleted) {
                console.log("Summary deleted successfully", summaryDeleted);
                res.status(200).json({
                    message: "Summary deleted successfully",
                    summary: summaryDeleted,
                });
            } else {
                res.status(404).json({
                    message: "Summary not found",
                });
            }
        })
        .catch((err) => {
            console.error("Error deleting Summary", err);
            res.status(500).json({
                message: "Error deleting Summary",
                error: err,
            });
        });
};
