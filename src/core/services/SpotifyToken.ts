const ID_TOKEN_SPOTIFY_KEY = "id_token_spotify" as string;
const ID_REFRESH_TOKEN_SPOTIFY_KEY = "id_refresh_token_spotify" as string;

/**
 * @description get token form localStorage
 */
export const getSpotifyToken = (): string | null => {
  return window.localStorage.getItem(ID_TOKEN_SPOTIFY_KEY);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveSpotifyToken = (token: string): void => {
  window.localStorage.setItem(ID_TOKEN_SPOTIFY_KEY, token);
};

/**
 * @description remove token form localStorage
 */
export const destroySpotifyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_SPOTIFY_KEY);
};

export const saveSpotifyRefreshToken = (token: string): void => {
  window.localStorage.setItem(ID_REFRESH_TOKEN_SPOTIFY_KEY, token);
};

export const getSpotifyRefreshToken = (): string | null => {
  return window.localStorage.getItem(ID_REFRESH_TOKEN_SPOTIFY_KEY);
};
export const destroySpotifyRefreshToken = (): void => {
  window.localStorage.removeItem(ID_REFRESH_TOKEN_SPOTIFY_KEY);
};

export default {
  getSpotifyToken,
  saveSpotifyToken,
  destroySpotifyToken,
  saveSpotifyRefreshToken,
  getSpotifyRefreshToken,
  destroySpotifyRefreshToken
};
