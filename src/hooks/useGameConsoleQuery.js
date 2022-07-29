import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_CONSOLE } from '../config/endpointAPi'

const getGameConsole = async ({ queryKey }) => {
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data } = await getAxios(API_CONSOLE, params)

  return data
}

const useGameConsoleQuery = (params) => {
  return useQuery(['gameconsole', ...params], getGameConsole, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useGameConsoleQuery
