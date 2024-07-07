const TOKEN = 'auth_token';
const saveLoginInfo = (token: string) => {
  localStorage.setItem(TOKEN, token);
};
const getLoginInfo = () => {
  return localStorage.getItem(TOKEN);
};
const clearLoginInfo = () => {
  localStorage.clear();
};

export { saveLoginInfo, getLoginInfo, clearLoginInfo };
