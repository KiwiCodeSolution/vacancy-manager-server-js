const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/mainRouter");
const vacancyRouter = require("./routes/vacancies");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const settingsRouter = require("./routes/settingsRouter");
const requestLogger = require("./morgan/morgan");

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/vacancy", vacancyRouter);
app.use("/profile", profileRouter);
app.use("/settings", settingsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
