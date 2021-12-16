const ID_TOKEN_KEY = "id_token" as string;
const ID_REFRESH_TOKEN_KEY = "id_refresh_token" as string;

/**
 * @description get token form localStorage
 */
export const getToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const saveRefreshToken = (token: string): void => {
  window.localStorage.setItem(ID_REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = (): string | null => {
  return window.localStorage.getItem(ID_REFRESH_TOKEN_KEY);
};

export default {
  getToken,
  saveToken,
  destroyToken,
  saveRefreshToken,
  getRefreshToken,
};
