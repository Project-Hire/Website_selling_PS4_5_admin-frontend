//Base path
export const DASHBOARD = '/'
export const ADMIN = '/admin'

// Authenticate
export const ADMIN_LOGIN = `${ADMIN}/login`

// Home
export const HOME = `${DASHBOARD}`

//Advertisement
export const ADVERTISEMENT = `${ADMIN}/advertisement`
export const ADVERTISEMENT_CREATE = `${ADVERTISEMENT}/create`
export const ADVERTISEMENT_UPDATE = `${ADVERTISEMENT}/:id/update`
export const ADVERTISEMENT_DETAIL = `${ADVERTISEMENT}/detail/:id`

//CDGame
export const CDGAME = `${ADMIN}/cdgame`
export const CDGAME_CREATE = `${CDGAME}/create`
export const CDGAME_UPDATE = `${CDGAME}/:id/update`
export const CDGAME_DETAIL = `${CDGAME}/detail/:id`