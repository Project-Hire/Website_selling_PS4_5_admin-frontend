import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_GIFTCARD_DETAIL } from '../config/endpointAPi'
import { bindParams } from '../config/function'

const getGiftCard = async (id) => {
  const { data } = await getAxios(bindParams(API_GIFTCARD_DETAIL, { id }))

  return data
}

const useGiftCardDetailQuery = (id) => {
  return useQuery(['giftCard_detail'], () => getGiftCard(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useGiftCardDetailQuery
