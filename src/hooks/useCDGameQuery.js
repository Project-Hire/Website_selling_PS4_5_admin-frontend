import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_CDGAME } from '../config/endpointAPi'

const getCDGame = async ({ queryKey }) => {
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data } = await getAxios(API_CDGAME, params)

  return data
}

const useCDGameQuery = (params) => {
  return useQuery(['cdgame', ...params], getCDGame, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useCDGameQuery
