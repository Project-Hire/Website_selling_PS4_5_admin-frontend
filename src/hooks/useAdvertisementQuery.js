import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_ADVERTISEMENT } from '../config/endpointAPi'

const getAdvertisement = async ({ queryKey }) => {
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data } = await getAxios(API_ADVERTISEMENT, params)

  return data
}

const useAdvertisementQuery = (params) => {
  return useQuery(['advertisement', ...params], getAdvertisement, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useAdvertisementQuery
