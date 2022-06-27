import { useMutation } from 'react-query'
import {  API_CDGAME_STORE } from '../config/endpointAPi'
import { postAxios } from '../Http'

const createCDGame = async (params) => {
  return await postAxios(API_CDGAME_STORE, params)
}

const useCDGameCreate = () => {
  return useMutation(createCDGame)
}

export default useCDGameCreate