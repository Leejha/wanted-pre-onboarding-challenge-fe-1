import userStorage from 'utils/userStorage';

export const isLogin = () => {
  const token = userStorage.get();
  return !!token;
};
