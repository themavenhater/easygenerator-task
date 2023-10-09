export const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5170";

export const REGISTER_API = "/auth/register";
export const LOGIN_API = "/auth/login";
export const GET_USER_API = "/user/me";

export const PASSWORD_REGEX =
  "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
