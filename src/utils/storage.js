const storage = {
  set: (key, value) => {
    if (!key) return;

    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },

  get: (key) => {
    const value = localStorage.getItem(key);

    if (!value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  removeAll: () => {
    localStorage.clear();
  },
};
