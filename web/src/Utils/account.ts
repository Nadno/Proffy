import { setCookie, getCookie, removeCookie } from './storage';

const expires = new Date();

expires.setFullYear(expires.getFullYear() + 1);

const options = { expires };

const COOKIE_ACCOUNT = 'acc';
const COOKIE_TOKEN = 'tk';
const COOKIE_REFRESH_TOKEN = 'rtk';

export const setAccount = (account: object) => setCookie(COOKIE_ACCOUNT, account, options);
export const getAccount = () => getCookie(COOKIE_ACCOUNT);
export const removeAccount = () => removeCookie(COOKIE_ACCOUNT);

export const setToken = (token: string) => setCookie(COOKIE_TOKEN, token, options);
export const getToken = () => getCookie(COOKIE_TOKEN);
export const removeToken = () => removeCookie(COOKIE_TOKEN);

export const setRefreshToken = (refreshToken: string) => setCookie(COOKIE_REFRESH_TOKEN, refreshToken, options);
export const getRefreshToken = () => getCookie(COOKIE_REFRESH_TOKEN);
export const removeRefreshToken = () => removeCookie(COOKIE_REFRESH_TOKEN);