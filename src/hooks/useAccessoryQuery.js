import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_ACCESSORY } from '../config/endpointAPi'

const getAccessory = async ({ queryKey }) => {
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const { data } = await getAxios(API_ACCESSORY, params)

  return data
}

const useAccessoryQuery = (params) => {
  return useQuery(['accessory', ...params], getAccessory, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useAccessoryQuery
