export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
  },
};

export const PRIVATE_ROUTES = [ROUTES.DASHBOARD, ROUTES.PROFILE];
