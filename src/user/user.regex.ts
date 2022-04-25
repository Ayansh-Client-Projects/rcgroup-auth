export const gstRegex =
  /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;

export const aadhaarRegex = /^[2-9]{1}\d{3}\\s\d{4}\\s\d{4}$/;

export const panRegex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[\.!@#$&*])(?=.*\d)(?=.*[a-z]).{8,}$/;
