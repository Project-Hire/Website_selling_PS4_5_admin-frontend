import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_ADVERTISEMENT_DETAIL } from '../config/endpointAPi'
import { bindParams } from '../config/function'

const getAdvertisement = async (id) => {
  const { data } = await getAxios(bindParams(API_ADVERTISEMENT_DETAIL, { id }))

  return data
}

const useAdvertisementDetailQuery = (id) => {
  return useQuery(['advertisement_detail'], () => getAdvertisement(id), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useAdvertisementDetailQuery
