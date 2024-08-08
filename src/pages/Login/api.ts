import { Get } from '@/api';

export interface ILoginParams {
  username: string;
  password: string;
}
export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  token: string;
}

function _md5(data: ILoginParams) {
  //加密密码

  return data;
}
export const login = (data: { username: string; password: string }) => {
  const secret = _md5(data);
  return Get<IUser>('/login', secret);
};
