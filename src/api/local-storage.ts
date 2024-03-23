const TOKEN = 'current_token';
const saveLoginInfo = (token: string) => {
  localStorage.setItem(TOKEN, token);
};
const getLoginInfo = () => {
  return localStorage.getItem(TOKEN);
};

export { saveLoginInfo, getLoginInfo };
