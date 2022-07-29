import { useMutation } from 'react-query'
import { API_CONSOLE_UPDATE } from '../config/endpointAPi'
import { postAxios } from '../Http'

const updateGameConsole = async (params) => {
  return await postAxios(API_CONSOLE_UPDATE, params)
}

const useGameConsoleUpdate = () => {
  return useMutation(updateGameConsole)
}

export default useGameConsoleUpdate
