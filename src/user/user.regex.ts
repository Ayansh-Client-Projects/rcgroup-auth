export const gstRegex =
  /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;

export const aadhaarRegex = /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/;

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[\.!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
