import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_ACCESSORY_DETAIL } from '../config/endpointAPi'
import { bindParams } from '../config/function'

const getAccessory = async (id) => {
  const { data } = await getAxios(bindParams(API_ACCESSORY_DETAIL, { id }))

  return data
}

const useAccessoryDetailQuery = (id) => {
  return useQuery(['accessory_detail'], () => getAccessory(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useAccessoryDetailQuery
