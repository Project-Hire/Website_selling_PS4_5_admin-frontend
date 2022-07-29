import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_CONSOLE_DETAIL } from '../config/endpointAPi'
import { bindParams } from '../config/function'

const getGameConsole = async (id) => {
  const { data } = await getAxios(bindParams(API_CONSOLE_DETAIL, { id }))

  return data
}

const useGameConsoleDetailQuery = (id) => {
  return useQuery(['gameconsole_detail'], () => getGameConsole(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useGameConsoleDetailQuery
