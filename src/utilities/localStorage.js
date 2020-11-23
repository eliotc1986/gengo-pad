export const getLSItem = (key, fallback = []) => {
  const item = window.localStorage.getItem(key);

  return item ? JSON.parse(item) : fallback;
};

export const setLSItem = (key, data) => {
  if (!key || !data) return false;

  return localStorage.setItem(key, JSON.stringify(data));
};
