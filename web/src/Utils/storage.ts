import Cookies, { Cookie, CookieSetOptions, CookieGetOptions } from 'universal-cookie';
import { Teacher } from "./interfaces";
import { FAVORITES } from '../pages/TeacherList';

const cookie = new Cookies();

const defaultOptions = {
  path: '/',
};

export const getCookie = (name: string, options:CookieGetOptions = {} ) => {
  if(!name) return null;
  
  return cookie.get(name, { ...defaultOptions, ...options });
}

export const setCookie = (name: string, value: Cookie, options:CookieSetOptions = {} ) => {
  if(!name || value === undefined) return null;

  return cookie.set(name, value, { ...defaultOptions, ...options });
}

export const removeCookie = (name: string, options:CookieSetOptions = {} ) => {
  if(!name) return null;

  return cookie.remove(name, { ...defaultOptions, ...options });
}

const getSave = () => {
  let favorites = localStorage.getItem(FAVORITES);

  if(favorites) {
    const save = parseJson(favorites);
    return save;
  } else {
    localStorage.setItem(FAVORITES, "[]");
    return [];
  };
};

export const saveStorage = (favorites: Array<object>) => {
  try {
    const save = JSON.stringify(favorites);
    localStorage.setItem(FAVORITES, save);
  } catch (err) {
    return err;
  }
};

const parseJson = (favorites: string) => {
  try {
    return JSON.parse(favorites);
  } catch (e) {
    return null;
  }
};

export const getIds = () => {
  const save = getSave();
  if(save.length >= 0) {
    const ids = save.map((teacher: Teacher) => teacher.id);
    return ids;
  };

  return "";
};

export default getSave;