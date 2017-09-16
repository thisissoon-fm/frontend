import { CustomConfig } from 'ng2-ui-auth';

import { environment } from '../../../environments/environment';

export class AuthConfig extends CustomConfig {
  defaultHeaders = { 'Content-Type': 'application/json' };
  tokenName = environment.googleAuthTokenName;
  tokenPrefix = environment.googleAuthTokenPrefix;
  authHeader = environment.playerAuthHeader;
  storageType = <any>'localStorage';
  providers = {
    google: {
      clientId: environment.googleClientId,
      url: `${environment.apiUrlPlayer}oauth2/google/connect`,
      redirectUri: environment.googleRedirectUri
    }
  };
}
