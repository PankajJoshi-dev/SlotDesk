import dayjs from "dayjs";

import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const APP_TIMEZONE = "Asia/Kolkata";

const todayCheck = (date) =>
  dayjs(date).tz(APP_TIMEZONE).isSame(dayjs().tz(APP_TIMEZONE), "day");

export { dayjs, APP_TIMEZONE, todayCheck };
