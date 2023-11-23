import moment from 'moment-timezone';
import { getBrowserInfo } from '../helper/browser-info';
import storage from '../helper/storage';
import { SocialProviderEnum } from '../models/auth';
import { Tokens } from '../models/token';
import { UserProfile } from '../models/user-profile';
import { request, authRequest, authRequestWithoutExpCheck } from './base';
import { Password } from '@mui/icons-material';

window.moment = moment;

interface LoginResponseBody {
  profile?: UserProfile;
  tokens?: Tokens;
}

// const login = (token: string, provider: SocialProviderEnum) => {
//   const info = getBrowserInfo();
//   return request<LoginResponseBody>({
//     url: '/login',
//     method: 'POST',
//     body: {
//       provider: {
//         id: provider,
//         token: token,
//       },
//       device: {
//         type: 'web',
//         name: info.browserName,
//         uid: storage.getDeviceId(),
//       },
//       timezone: moment.tz.guess(),
//       locale: info.language,
//       isBusiness: true,
//     },
//   });
// };

const loginTest = (userName: string, password: string) => {
  return request<any>({
    url: '/login',
    method: 'POST',
    body: {
      tai_khoan: userName,
      mat_khau: password,
    },
  });
};
const register = (ten:string, tai_khoan: string, mat_khau: string, email:string) => {
  return request<any>({
    url: '/register',
    method: 'POST',
    body: {
      ten,
      tai_khoan,
      mat_khau,
      email
    },
  });
};

const logoutUser = () => {
  return authRequest<any>({
    url: '/logout',
    method: 'GET',
  });
};

const xacThucUser = (active_code:string) => {
  return request<any>({
    url: '/user/confirmRegister',
    method: 'POST',
    body:{
      active_code
    }
  });
};

const authApi = {
  loginTest,
  register,
  // login,
  logoutUser,
  xacThucUser
};

export default authApi;
