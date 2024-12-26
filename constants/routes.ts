export const Routes = {
  Home: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  ASK_QUESTION: "/ask-question",
  PROFILE: (id: string) => `/profile/${id}`,
  TAGS: (id: string) => `/tags/${id}`,
};
