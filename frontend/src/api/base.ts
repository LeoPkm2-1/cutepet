import storage from '../helper/storage';
import axios from 'axios';
import { store } from '../redux';
import { AuthActions } from '../redux/auth';
import jwt_decode from 'jwt-decode';

class RequestGlobal {
  static controllers: { [key: string]: AbortController | undefined } = {};
  static promise?: Promise<any>;
  static beforeCall() {
    if (this.promise) {
      return this.promise;
    }
    this.promise = Promise.resolve().then(() => {
      // TODO: check token expired and refresh here
      const { accessToken, refreshToken } = storage.getTokens() ?? {};
      if (accessToken) {
        try {
          const { exp = 0 } = jwt_decode<any>(accessToken);

          const now = Date.now() / 1000;
          if (exp - now < 60) {
            return authRequestWithoutExpCheck<{ accessToken: string }>({
              url: '/refresh-token',
              method: 'POST',
              body: {
                refreshToken,
                deviceUid: storage.getDeviceId(),
              },
            })
              .then((res) => {
                storage.setTokens({
                  accessToken: res.accessToken,
                  refreshToken: refreshToken ?? '',
                });
              })
              .catch((err) => {
                console.error('Refresh token failed', err);
              });
          }
        } catch (e) {
          console.log(e);
        }
      }
      this.promise = undefined;
    });

    return this.promise;
  }

  static cancel(key: string) {
    const controller = this.controllers[key];
    controller?.abort();
    delete this.controllers[key];
  }

  static createAbortController(key: string) {
    this.cancel(key);
    this.controllers[key] = new AbortController();
    return this.controllers[key];
  }
}

export interface ListPaginationResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  pageIndex: number;
}

export interface ListPagination<T> {
  items: T[];
  limit: number;
  totalPages: number;
  currentPage: number;
}

type HttpRequestMethods = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

type QueryValueTypes = string | number | boolean | undefined;
export type QueryType = { [key: string]: QueryValueTypes | QueryValueTypes[] };

const BASE_URL = process.env.REACT_APP_SERVER_API_HOST;

export interface RequestOptions {
  method?: HttpRequestMethods;
  url: string;
  query?: QueryType;
  // tslint:disable-next-line: no-any
  body?: any;
  headers?: { [key: string]: string };
}

export interface CancelOption {
  key?: string;
  cancelable?: boolean;
}

export type RequestKey = string | number;

export function request<T>(
  options: RequestOptions,
  cancelOptions?: CancelOption
): Promise<T> {
  const key =
    cancelOptions?.key ?? `${options.method ?? 'GET'}|${options?.url}`;
  const controller = cancelOptions?.cancelable
    ? RequestGlobal.createAbortController(key)
    : undefined;
  return axios
    .request<T>({
      url: options.url,
      baseURL: BASE_URL,
      params: options.query,
      data: options.body,
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
      signal: controller?.signal,
    })
    .then((res) => res.data)
    .catch((err) => {
      const res = err?.response;
      if (res) {
        throw res.data ?? res;
      }
      throw err ?? new Error('Unknown Error');
    });
}

/**
 * Create HTTP request, auto add access tokens without pre-check token expired
 * @param options request options
 * @param cancelOptions
 * @returns
 */
export function authRequestWithoutExpCheck<T>(
  options: RequestOptions,
  cancelOptions?: CancelOption
): Promise<T> {
  const accessToken = storage.getTokens()?.accessToken;

  return request<T>(
    {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    },
    cancelOptions
  ).catch((error) => {
    if (error?.error?.statusCode === 401) {
      if (store.getState().auth.mindfullyAuth) {
        // @ts-ignore
        store.dispatch(AuthActions.logout());
      }
    }
    throw error;
  });
}

/**
 * Create HTTP request, auto add access token and check token expired before call request
 * @param options request options
 * @param cancelOptions
 * @returns
 */
export function authRequest<T>(
  options: RequestOptions,
  cancelOptions?: CancelOption
) {
  return RequestGlobal.beforeCall().then(() => {
    return authRequestWithoutExpCheck<T>(options, cancelOptions);
  });
}
