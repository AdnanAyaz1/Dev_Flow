export const Routes = {
  Home: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  ASK_QUESTION: "/ask-question",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
  TAGS: (id: string) => `/tags/${id}`,
  SIGN_IN_WITH_OAUTH: "signin-with-oauth",
};
