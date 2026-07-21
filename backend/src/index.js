import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.config.js";

(async () => {
  await connectDB();
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
})();
