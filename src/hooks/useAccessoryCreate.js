import { useMutation } from 'react-query'
import { API_ACCESSORY_STORE } from '../config/endpointAPi'
import { postAxios } from '../Http'

const createAccessory = async (params) => {
  return await postAxios(API_ACCESSORY_STORE, params)
}

const useAccessoryCreate = () => {
  return useMutation(createAccessory)
}

export default useAccessoryCreate
