const TOKEN_STORAGE_KEY = 'UserAuth';

const userStorage = {
  get() {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    try {
      if (!token) return null;
      const parsedtoken = JSON.parse(token) as string;
      return parsedtoken;
    } catch (e) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }
  },
  set(token: string) {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  },
  remove() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
};

export default userStorage;
