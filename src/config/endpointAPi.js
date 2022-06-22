export const BASE_API = 'http://127.0.0.1:8000'

//Api Auth
export const API_LOGIN = `${BASE_API}/api/auth/login`

//Api Advertisement
export const API_ADVERTISEMENT = `${BASE_API}/api/advertise`
export const API_ADVERTISEMENT_DELETE = `${API_ADVERTISEMENT}/delete/:id`
export const API_ADVERTISEMENT_STORE = `${API_ADVERTISEMENT}/store`
export const API_ADVERTISEMENT_UPDATE = `${API_ADVERTISEMENT}/update`
export const API_ADVERTISEMENT_DETAIL = `${API_ADVERTISEMENT}/detail/:id`
