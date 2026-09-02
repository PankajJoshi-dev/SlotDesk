import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.config.js";
import startCronJobs from "./cron/cron.index.js";

(async () => {
  await connectDB();
  startCronJobs();

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
})();
