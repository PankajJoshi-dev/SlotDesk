const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  let displayHour = hours % 12;

  if (displayHour === 0) {
    displayHour = 12;
  }

  const period = hours >= 12 ? "PM" : "AM";

  return `${displayHour}:${String(mins).padStart(2, "0")} ${period}`;
};

export default formatTime;
