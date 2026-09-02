import cron from "node-cron";
import {
  updatePendingPayments,
  updateRefundState,
  refundCapturedPayments,
} from "../services/payment.service.js";

import {
  updatePendingBookings,
  completeBookings,
  cleanupRejectedBookings,
} from "../services/booking.service.js";

const startCronJobs = () => {
  // Every minute
  cron.schedule("* * * * *", updatePendingPayments);
  cron.schedule("* * * * *", updatePendingBookings);

  // Every 5 minutes
  cron.schedule("*/5 * * * *", refundCapturedPayments);
  cron.schedule("*/5 * * * *", updateRefundState);
  cron.schedule("*/5 * * * *", completeBookings);

  // Every 15 Minutes
  cron.schedule("*/15 * * * *", cleanupRejectedBookings);
};

export default startCronJobs;
