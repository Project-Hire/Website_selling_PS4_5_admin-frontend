import { ADMIN_LOGIN, HOME } from '../config/path'

const routes = [
  {
    path: ADMIN_LOGIN,
    exact: true,
    isPrivate: false,
    component: import('../components/auth/index'),
    restricted: true,
  },
  {
    path: HOME,
    exact: true,
    isPrivate: true,
    component: import('../components/home/index'),
    restricted: false,
  },
]

export default routes
