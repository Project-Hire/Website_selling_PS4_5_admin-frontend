import { API_CDGAME_UPDATE } from '../config/endpointAPi'
import { postAxios } from '../Http'
import { useMutation } from 'react-query'

const updateCDGame = async (params) => {
  return await postAxios(API_CDGAME_UPDATE, params)
}

const useCDGameUpdate = () => {
  return useMutation(updateCDGame)
}

export default useCDGameUpdate