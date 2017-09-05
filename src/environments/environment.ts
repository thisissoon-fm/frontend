// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrlPlayer: 'http://localhost:5000/',
  apiUrlSpotify: 'https://api.spotify.com/v1/',
  playerAuthHeader: 'Access-Token',
  playerSocketUrl: 'http://localhost:8080/',
  googleClientId: '999522755620-6eqk606akoip4malaqp4pndnb2i9v8v1.apps.googleusercontent.com',
  googleRedirectUri: 'http://localhost:3000/',
  googleAuthTokenPrefix: 'sn_fm',
  googleAuthTokenName: 'access_token',
  spotifyMarket: 'GB'
};
