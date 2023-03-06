const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/mainRouter");
const vacancyRouter = require("./routes/vacancies");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const quickLinksRouter = require("./routes/quickLinks");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(400).send("<h1> kiwicode.tech</h1 > ");
});
app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/vacancy", vacancyRouter);
app.use("/profile", profileRouter);
app.use("/quickLinks", quickLinksRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
