import { useMutation } from 'react-query'
import { API_ADVERTISEMENT_STORE } from '../config/endpointAPi'
import { postAxios } from '../Http'

const createAdvertisement = async (params) => {
  return await postAxios(API_ADVERTISEMENT_STORE, params)
}

const useCreateAdvertisement = () => {
  return useMutation(createAdvertisement)
}

export default useCreateAdvertisement
