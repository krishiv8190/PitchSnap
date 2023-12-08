const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
    {
        id: {
            type: String,
            
        },
        prompt: {
            type: String,
            
        },
        summary: {
            type: String,
        },
        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Summary", summarySchema);
