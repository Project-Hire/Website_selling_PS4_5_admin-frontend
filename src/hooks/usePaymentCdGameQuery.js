import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_PAYMENT_CD_GAME } from '../config/endpointAPi'

const getPaymentCdGame = async ({ queryKey }) => {
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data } = await getAxios(API_PAYMENT_CD_GAME, params)

  return data
}

const usePaymentCdGameQuery = (params) => {
  return useQuery(['payment_cd_game', ...params], getPaymentCdGame, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default usePaymentCdGameQuery
