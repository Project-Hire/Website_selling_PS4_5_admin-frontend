import { useMutation } from 'react-query'
import { API_CONSOLE_STORE } from '../config/endpointAPi'
import { postAxios } from '../Http'

const createGameConsole = async (params) => {
  return await postAxios(API_CONSOLE_STORE, params)
}

const useGameConsoleCreate = () => {
  return useMutation(createGameConsole)
}

export default useGameConsoleCreate
