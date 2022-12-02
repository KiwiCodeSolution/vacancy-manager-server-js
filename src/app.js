const express = require("express");
const cors = require("cors");
const vacancyRouter = require("./routes/vacancies");
const authRouter = require("./routes/authRouter");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/vacancy", vacancyRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(async (err, req, res) => {
  console.log("route not found");
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.use(async (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
