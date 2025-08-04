require("dotenv").config();

const express = require("express");
const bodyparser = require("body-parser");
const HttpError = require("./models/http-error");
const url = process.env.DATABASE_URL;


const library = require("./routes/library-routes");
const user = require("./routes/user-routes");
const createUser = require("./routes/create-user-routes");
const course = require("./routes/course-routes");
const academic = require("./routes/academic-routes");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const manageUser = require("./routes/user-handling-route");
const tokenController = require("./controller/token-controller");

// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

app.use(cookieParser());
// var bodyParser = require(‘body-parser’);
app.use(express.json());
app.use(bodyparser.json());
// app.use(cors(corsOptions));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/", sessionHandle);
app.use(
  cors({
    origin: true, // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use("/api/library", library);
app.use("/api/manageusers", manageUser);
app.use("/api/login", user);
app.use("/api/logon", createUser);
app.use("/api/courses", course);
app.use("/api/academic", academic);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 300);
  res.json({ message: error.message || "An Unexpected Error Occured" });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is started at port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
