const app = require("./app");
const mongoose = require("./dbMongo/mongoose/mongoose");
// const cron = require("node-cron");

const PORT = process.env.PORT || 80;
const server = async () => {
  try {
    await mongoose;
    app.listen(PORT, () => {
      console.log("server is up");
    });
    // cron.schedule("1 * * * *", () => console.log("cron"));
  } catch (error) {
    console.log(error);
  }
};
server();
