export const Routes = {
  Home: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  PROFILE: (id: string) => `/profile/${id}`,
  TAGS: (id: string) => `/tags/${id}`,
};
