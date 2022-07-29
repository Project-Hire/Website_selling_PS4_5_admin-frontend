import { API_GIFTCARD_UPDATE } from '../config/endpointAPi'
import { postAxios } from '../Http'
import { useMutation } from 'react-query'

const updateGiftCard = async (params) => {
  return await postAxios(API_GIFTCARD_UPDATE, params)
}

const useGiftCardUpdate = () => {
  return useMutation(updateGiftCard)
}

export default useGiftCardUpdate