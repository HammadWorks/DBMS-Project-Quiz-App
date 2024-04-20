const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const UserRoute = require("./routes/user");
const QuizRoute = require("./routes/quiz");

const { connectToMongoDB } = require("./connect");
const {
  verifyTokenMiddleWareForAuthentication,
  userLoginCheck,
} = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Connection to Database
connectToMongoDB("mongodb://127.0.0.1:27017/DBMS-Project").then(() => {
  console.log("MongoDB connected!");
});

// Middlewares
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
