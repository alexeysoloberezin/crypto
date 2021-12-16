enum Actions {
  // action types
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgotPassword",
}

enum Mutations {
  // mutation types
  PURGE_AUTH = "logOut",
  SET_AUTH = "setAuth",
  SET_USER = "setUser",
  SET_ERROR = "setError",
  SET_USER_CREATED = "setUserCreated"
}

export { Actions, Mutations };
