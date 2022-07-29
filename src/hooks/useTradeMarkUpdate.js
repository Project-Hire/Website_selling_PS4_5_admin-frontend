import { useMutation } from 'react-query'
import { API_TRADEMARK_UPDATE } from '../config/endpointAPi'
import { postAxios } from '../Http'

const updateTradeMark = async (params) => {
  return await postAxios(API_TRADEMARK_UPDATE, params)
}

const useTradeMarkUpdate = () => {
  return useMutation(updateTradeMark)
}

export default useTradeMarkUpdate
