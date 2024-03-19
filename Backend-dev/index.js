const express = require("express");
const path = require("path");
const UserRoute = require("./routes/user");
const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToMongoDB("mongodb://127.0.0.1:27017/DBMS-Project").then(() => {
  console.log("MongoDB connected!");
});

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("Home");
});

app.use("/user", UserRoute);

app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});
