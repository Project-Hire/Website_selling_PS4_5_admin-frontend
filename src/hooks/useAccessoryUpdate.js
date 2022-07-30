import { useMutation } from 'react-query'
import { API_ACCESSORY_UPDATE } from '../config/endpointAPi'
import { postAxios } from '../Http'

const updateAccessory = async (params) => {
  return await postAxios(API_ACCESSORY_UPDATE, params)
}

const useAccessoryUpdate = () => {
  return useMutation(updateAccessory)
}

export default useAccessoryUpdate