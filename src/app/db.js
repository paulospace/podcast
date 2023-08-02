import localforage from "localforage";

export const storage = () => {
  return {
    localforage,
    setItem: localforage.setItem,
    getItem: localforage.getItem,
    removeItem: localforage.removeItem,
  };
};
