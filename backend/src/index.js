import dotenv from "dotenv";
import app from "./app.js";

(async () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
})();
