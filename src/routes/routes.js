import { ADMIN_LOGIN, ADVERTISEMENT, ADVERTISEMENT_CREATE, HOME } from '../config/path'

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
  {
    path: ADVERTISEMENT,
    exact: true,
    isPrivate: true,
    component: import('../components/advertisement/index'),
    restricted: false,
  },
  {
    path: ADVERTISEMENT_CREATE,
    exact: true,
    isPrivate: true,
    component: import('../components/advertisement/CreateAdvertisement'),
    restricted: false,
  },
]

export default routes
