import { Tokens } from '../models/token';
import { v4 as uuidv4 } from 'uuid';

const TOKEN_KEY = 'token';
const DEVICE_KEY = 'device';
const RESET_PASSWORD_KEY = 'reset-pw-ts';

function getDeviceId() {
  const deviceId = localStorage.getItem(DEVICE_KEY);
  if (deviceId) {
    return deviceId.toString();
  }
  const id = uuidv4();
  localStorage.setItem(DEVICE_KEY, id);
  return id;
}

function getTokens() {
  const str = localStorage.getItem(TOKEN_KEY);
  if (str) {
    return JSON.parse(str) as Tokens;
  }
  return;
}

function setTokens(tokens?: Tokens) {
  if (!tokens) {
    return localStorage.removeItem(TOKEN_KEY);
  }
  return localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

function getResetPasswordTimestamp() {
  const str = localStorage.getItem(RESET_PASSWORD_KEY);
  try {
    if (!str || !+str) {
      return 0;
    }
    return +str;
  } catch {
    return 0;
  }
}

function setResetPasswordTimestamp(v: number) {
  return localStorage.setItem(RESET_PASSWORD_KEY, JSON.stringify(v));
}

export default {
  getDeviceId,
  getTokens,
  setTokens,
  getResetPasswordTimestamp,
  setResetPasswordTimestamp,
};
