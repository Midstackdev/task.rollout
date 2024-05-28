import cron from "node-cron";
import { fetchAndStorePhotos } from "../sripts/fetchPhotos";

// Schedule a task to run every hour
cron.schedule("* 1 * * *", () => {
  fetchAndStorePhotos();
});
