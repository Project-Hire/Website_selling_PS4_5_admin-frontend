import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_GIFTCARD } from '../config/endpointAPi'

const getGiftCard = async ({ queryKey }) => {
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data } = await getAxios(API_GIFTCARD, params)

  return data
}

const useGiftgetGiftCardQuery = (params) => {
  return useQuery(['giftgetGiftCard', ...params], getGiftCard, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useGiftgetGiftCardQuery