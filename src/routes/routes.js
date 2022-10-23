import {
  ADMIN_LOGIN,
  ADVERTISEMENT,
  ADVERTISEMENT_CREATE,
  ADVERTISEMENT_DETAIL,
  ADVERTISEMENT_UPDATE,
  HOME,
  CDGAME,
  CDGAME_CREATE,
  CDGAME_UPDATE,
  CDGAME_DETAIL,
  GAMECONSOLE,
  GAMECONSOLE_CREATE,
  GAMECONSOLE_DETAIL,
  GAMECONSOLE_UPDATE,
  TRADEMARK,
  TRADEMARK_CREATE,
  TRADEMARK_DETAIL,
  TRADEMARK_UPDATE,
  GIFTCARD,
  GIFTCARD_CREATE,
  GIFTCARD_DETAIL,
  GIFTCARD_UPDATE,
  ACCESSORY,
  ACCESSORY_CREATE,
  ACCESSORY_UPDATE,
  ACCESSORY_DETAIL,
  PAYMENT_CD_GAME,
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

  //Advertisement path
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

  //CD Game path
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
  {
    path: CDGAME_UPDATE,
    exact: true,
    isPrivate: true,
    component: import('../components/cdgame/UpdateCDGame'),
    restricted: false,
  },
  {
    path: CDGAME_DETAIL,
    exact: true,
    isPrivate: true,
    component: import('../components/cdgame/CDGameDetail'),
    restricted: false,
  },

  //Gameconsole path
  {
    path: GAMECONSOLE,
    exact: true,
    isPrivate: true,
    component: import('../components/gameconsole/index'),
    restricted: false,
  },
  {
    path: GAMECONSOLE_CREATE,
    exact: true,
    isPrivate: true,
    component: import('../components/gameconsole/CreateGameConsole'),
    restricted: false,
  },
  {
    path: GAMECONSOLE_UPDATE,
    exact: true,
    isPrivate: true,
    component: import('../components/gameconsole/UpdateGameConsole'),
    restricted: false,
  },
  {
    path: GAMECONSOLE_DETAIL,
    exact: true,
    isPrivate: true,
    component: import('../components/gameconsole/GameConsoleDetail'),
    restricted: false,
  },

  //Trademark path
  {
    path: TRADEMARK,
    exact: true,
    isPrivate: true,
    component: import('../components/trademark/index'),
    restricted: false,
  },
  {
    path: TRADEMARK_CREATE,
    exact: true,
    isPrivate: true,
    component: import('../components/trademark/CreateTradeMark'),
    restricted: false,
  },
  {
    path: TRADEMARK_UPDATE,
    exact: true,
    isPrivate: true,
    component: import('../components/trademark/UpdateTradeMark'),
    restricted: false,
  },

  //Gift card path
  {
    path: GIFTCARD,
    exact: true,
    isPrivate: true,
    component: import('../components/giftcard/index'),
    restricted: false,
  },
  {
    path: GIFTCARD_CREATE,
    exact: true,
    isPrivate: true,
    component: import('../components/giftcard/CreateGiftCard'),
    restricted: false,
  },
  {
    path: GIFTCARD_UPDATE,
    exact: true,
    isPrivate: true,
    component: import('../components/giftcard/UpdateGiftCard'),
    restricted: false,
  },
  {
    path: GIFTCARD_DETAIL,
    exact: true,
    isPrivate: true,
    component: import('../components/giftcard/GiftCardDetail'),
    restricted: false,
  },

  //Accessory path
  {
    path: ACCESSORY,
    exact: true,
    isPrivate: true,
    component: import('../components/accessory/index'),
    restricted: false,
  },
  {
    path: ACCESSORY_CREATE,
    exact: true,
    isPrivate: true,
    component: import('../components/accessory/CreateAccessory'),
    restricted: false,
  },
  {
    path: ACCESSORY_UPDATE,
    exact: true,
    isPrivate: true,
    component: import('../components/accessory/UpdateAccessory'),
    restricted: false,
  },
  {
    path: ACCESSORY_DETAIL,
    exact: true,
    isPrivate: true,
    component: import('../components/accessory/AccessoryDetail'),
    restricted: false,
  },
  {
    path: PAYMENT_CD_GAME,
    exact: true,
    isPrivate: true,
    component: import('../components/paymentCdGame/index'),
    restricted: false,
  },
]

export default routes
