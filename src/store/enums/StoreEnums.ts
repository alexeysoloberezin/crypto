enum Actions {
  // action types
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgotPassword",
  TOTAL_VOL_FULL = "totalVolFull",
  GET_NEWS = "GET_NEWS"
}

enum Mutations {
  // mutation types
  PURGE_AUTH = "logOut",
  SET_AUTH = "setAuth",
  SET_USER = "setUser",
  SET_ERROR = "setError",
  SET_USER_CREATED = "setUserCreated",
  SAVE_TOTAL_VOL_FULL = "saveTotalVolFull",
  SET_CRYPTO_COMPARE_ERROR = "SET_CRYPTO_COMPARE_ERROR",
  SET_CURRENCY_TYPE = "SET_CURRENCY_TYPE",
  SET_NEWS = "SET_NEWS"
}

export { Actions, Mutations };
