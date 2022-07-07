import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_TRADEMARK } from '../config/endpointAPi'

const getTradeMark = async ({ queryKey }) => {
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data } = await getAxios(API_TRADEMARK, params)

  return data
}

const useTrademarkQuery = (params) => {
  return useQuery(['trademark', ...params], getTradeMark, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useTrademarkQuery
