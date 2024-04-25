const express = require("express");
const { resolve } = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const UserRoute = require("./routes/user");
const QuizRoute = require("./routes/quiz");

const { connectToMongoDB } = require("./connect");
const {
  verifyTokenMiddleWareForAuthentication,
  userLoginCheck,
} = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT | 8000;
const MONGODB_URI = process.env.MONGODB_URI;

// EJS Setup
app.set("view engine", "ejs");
app.set("views", resolve("./views"));

// Connection to Database
connectToMongoDB(MONGODB_URI).then(() => {
  console.log("MongoDB connected!");
});

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(verifyTokenMiddleWareForAuthentication("token"));

// Routes
app.get("/", (req, res) => {
  return res.render("Home", { user: req.user });
});

app.use("/user", UserRoute);
app.use("/quiz", userLoginCheck, QuizRoute);

// Server Listen
app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});
