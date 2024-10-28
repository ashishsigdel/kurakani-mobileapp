import httpServer from "./app.js";
import dotenv from "dotenv";
import { sequelize } from "./database/dbConfig.js";
dotenv.config();

import db from "./models/index.js";

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    await sequelize.sync({ force: false, alter: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.log("An error occured while connecting database.");
  }
})();
