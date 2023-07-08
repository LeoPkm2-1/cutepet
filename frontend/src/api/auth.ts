import moment from 'moment-timezone';
import { getBrowserInfo } from '../helper/browser-info';
import storage from '../helper/storage';
import { SocialProviderEnum } from '../models/auth';
import { Tokens } from '../models/token';
import { UserProfile } from '../models/user-profile';
import { request, authRequest, authRequestWithoutExpCheck } from './base';

window.moment = moment;

interface LoginResponseBody {
  profile?: UserProfile;
  tokens?: Tokens;
}

const login = (token: string, provider: SocialProviderEnum) => {
  const info = getBrowserInfo();
  return request<LoginResponseBody>({
    url: '/login',
    method: 'POST',
    body: {
      provider: {
        id: provider,
        token: token,
      },
      device: {
        type: 'web',
        name: info.browserName,
        uid: storage.getDeviceId(),
      },
      timezone: moment.tz.guess(),
      locale: info.language,
      isBusiness: true,
    },
  });
};

const logout = () => {
  const refreshToken = storage.getTokens()?.refreshToken;
  return authRequestWithoutExpCheck<void>({
    url: '/logout',
    method: 'POST',
    body: {
      refreshToken,
    },
  });
};

const postRefreshToken = () => {
  const refreshToken = storage.getTokens()?.refreshToken;
  return authRequest<Tokens>({
    url: '/refresh-token',
    method: 'POST',
    body: {
      refreshToken,
    },
  });
};

const authApi = {
  login,
  logout,
  postRefreshToken,
};

export default authApi;
