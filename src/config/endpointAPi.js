export const BASE_API = 'http://127.0.0.1:8000'

//Api Auth
export const API_LOGIN = `${BASE_API}/api/auth/login`

//Api Advertisement
export const API_ADVERTISEMENT = `${BASE_API}/api/advertise`
export const API_ADVERTISEMENT_DELETE = `${API_ADVERTISEMENT}/delete/:id`
export const API_ADVERTISEMENT_STORE = `${API_ADVERTISEMENT}/store`
export const API_ADVERTISEMENT_UPDATE = `${API_ADVERTISEMENT}/update`
export const API_ADVERTISEMENT_DETAIL = `${API_ADVERTISEMENT}/detail/:id`

//Api CDGame
export const API_CDGAME = `${BASE_API}/api/cd_game`
export const API_CDGAME_DELETE = `${API_CDGAME}/delete/:id`
export const API_CDGAME_STORE = `${API_CDGAME}/store`
export const API_CDGAME_UPDATE = `${API_CDGAME}/update`
