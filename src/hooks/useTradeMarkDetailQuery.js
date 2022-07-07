import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_TRADEMARK_DETAIL } from '../config/endpointAPi'
import { bindParams } from '../config/function'

const getTradeMark = async (id) => {
  const { data } = await getAxios(bindParams(API_TRADEMARK_DETAIL, { id }))

  return data
}

const useTradeMarkDetailQuery = (id) => {
  return useQuery(['trademark_detail'], () => getTradeMark(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useTradeMarkDetailQuery