import { AUTH_TOKEN, USER_INFO } from './const'

export const isLogin = () => {
  return !!localStorage.getItem(AUTH_TOKEN) && !!localStorage.getItem(USER_INFO)
}
