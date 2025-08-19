export const ERRORS = {
  GENERAL: {
    INVALID_DATA: "Invalid data. Please check your inputs.",
    DATABASE: "Database error. Please try again later.",
    FIELD_REQUIRED: "This field is required.",
  },
  AUTH: {
    INVALID_CREDENTIALS: "Invalid email or password.",
    EMAIL_EXISTS: "Email already exists.",
    NOT_AUTHENTICATED: "Not authenticated.",
    USER_NOT_FOUND: "User not found.",
    PASSWORD_INCORRECT: "Current password is incorrect.",
  },
  USER: {
    PASSWORDS_MISMATCH: "Passwords do not match.",
    USERNAME_LENGTH: "Username must be between 2 and 30 characters.",
    EMAIL_FORMAT: "Email format is incorrect.",
    PASSWORD_COMPLEXITY:
      "The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).",
  },
  FILE: {
    REQUIRED: "File is required.",
    TYPE: "Must be a JPG, PNG, or WEBP image.",
    SIZE: "Max file size is 5MB.",
  },
} as const;
