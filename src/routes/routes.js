import {
  ADMIN_LOGIN,
  ADVERTISEMENT,
  ADVERTISEMENT_CREATE,
  ADVERTISEMENT_DETAIL,
  ADVERTISEMENT_UPDATE,
  HOME,
  CDGAME,
  CDGAME_CREATE,
} from '../config/path'

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
  {
    path: ADVERTISEMENT_UPDATE,
    exact: true,
    isPrivate: true,
    component: import('../components/advertisement/UpdateAdvertisement'),
    restricted: false,
  },
  {
    path: ADVERTISEMENT_DETAIL,
    exact: true,
    isPrivate: true,
    component: import('../components/advertisement/AdvertisementDetail'),
    restricted: false,
  },
  {
    path: CDGAME,
    exact: true,
    isPrivate: true,
    component: import('../components/cdgame/index'),
    restricted: false,
  },
  {
    path: CDGAME_CREATE,
    exact: true,
    isPrivate: true,
    component: import('../components/cdgame/CreateCDGame'),
    restricted: false,
  },
]

export default routes
