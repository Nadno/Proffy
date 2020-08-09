import { Teacher } from "./interfaces";

const getSave = () => {
  let favorites = localStorage.getItem("favorites");

  if(favorites) {
    const save = parseJson(favorites);
    return save;
  } else {
    localStorage.setItem("favorites", "[]");
    return [];
  };
};

export const saveStorage = (favorites: Array<object>) => {
  try {
    const save = JSON.stringify(favorites);
    localStorage.setItem("favorites", save);
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