export const formatMessageTime = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",  // "Jan", "Feb", etc.
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,   // 24-hour format
  });
};