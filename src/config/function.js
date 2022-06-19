import { AUTH_TOKEN, USER_INFO } from './const'

export const isLogin = () => {
  return !!localStorage.getItem(AUTH_TOKEN) && !!localStorage.getItem(USER_INFO)
}

export const pushHistory = () => {}

export const bindParams = (url, params) => {
  const { id } = params
  const string = url.replace(':id', id)

  return string
}
