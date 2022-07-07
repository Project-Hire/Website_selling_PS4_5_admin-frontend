import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_CDGAME_DETAIL } from '../config/endpointAPi'
import { bindParams } from '../config/function'

const getCDGame = async (id) => {
  const { data } = await getAxios(bindParams(API_CDGAME_DETAIL, { id }))

  return data
}

const useCDGameDetailQuery = (id) => {
  return useQuery(['cdgame_detail'], () => getCDGame(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useCDGameDetailQuery