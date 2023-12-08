const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const summaryRouter = require("./routes/summaryRoutes");

//connect to database
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB)
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => console.log("error connecting to database", err));

//get mongodb schema
require("./models/summary");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.use("/summary", summaryRouter);
app.get("/", (req, res) => {
    res.send("AI Summary API.");
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running : http://localhost:${process.env.PORT}/`);
});
