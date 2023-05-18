require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./db/connectDB");
const rateLimiter = require("./middlewares/rate-limiter-middleware");
const routes = require("./routes");

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true, limit: "30MB" }));

//connect DB
connectDB();

//PORT
const PORT = process.env.PORT || 5001;

//rate limit middleware
app.use(rateLimiter);

//routes
app.use("/api/v1", routes);

//error handle
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
    });
});

//init server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
