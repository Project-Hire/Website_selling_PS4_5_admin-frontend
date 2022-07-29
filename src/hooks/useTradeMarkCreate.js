import { useMutation } from 'react-query'
import { API_TRADEMARK_STORE } from '../config/endpointAPi'
import { postAxios } from '../Http'

const createTradeMark = async (params) => {
  return await postAxios(API_TRADEMARK_STORE, params)
}

const useTradeMarkCreate = () => {
  return useMutation(createTradeMark)
}

export default useTradeMarkCreate