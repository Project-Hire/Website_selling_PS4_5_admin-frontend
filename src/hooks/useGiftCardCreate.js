import { useMutation } from 'react-query'
import { API_GIFTCARD } from '../config/endpointAPi'
import { postAxios } from '../Http'

const createGiftCard = async (params) => {
  return await postAxios(API_GIFTCARD, params)
}

const useGiftCardCreate = () => {
  return useMutation(createGiftCard)
}

export default useGiftCardCreate
