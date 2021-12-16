// TODO: move to .env
const routeRoot = "https://addj.club/api";
// const routeRoot = "https://data.manu.team/api/addj";

const config = {
  routeLogin: routeRoot + "/login",
  routeRegistration: routeRoot + "/registration",
  routeAllTracks: routeRoot + "/spotify/all-tracks",
  routeGeterateTokensClient: routeRoot + "/spotify-api/generate-tokens-client"
};

export default config;
