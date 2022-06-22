import { useMutation } from 'react-query'
import { API_ADVERTISEMENT_UPDATE } from '../config/endpointAPi'
import { putAxios } from '../Http'

const updateAdvertisement = async (params) => {
  return await putAxios(API_ADVERTISEMENT_UPDATE, params)
}

const useUpdateAdvertisement = () => {
  return useMutation(updateAdvertisement)
}

export default useUpdateAdvertisement
