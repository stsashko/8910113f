export function formatPhoneNumber(phone) {
  let cleaned = phone.toString().replace(/\D/g, "");
  let match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  return match ? `+${match[1]} ${match[2]}-${match[3]}-${match[4]}` : phone;
}

export function formatDate(date) {
  let options = { month: "short", day: "numeric", year: "numeric" };
  date = new Date(date);

  return date.toLocaleDateString("en-US", options);
}

export function formatTime(datetimme) {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
  };
  datetimme = new Date(datetimme);
  return datetimme.toLocaleTimeString("en-US", options);
}

export function formatDateTime(date) {
  let options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  date = new Date(date);

  return date.toLocaleDateString("en-US", options);
}

export function errorMessage(error) {
  let errorData = null;

  switch (error?.response?.status) {
    case 404:
      errorData = "Error 404 not found";
      break;
    default:
      errorData = error;
  }

  let err = new Error(errorData);
  err.code = error?.response?.status || "";

  return err;
}
