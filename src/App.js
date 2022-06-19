import { QueryClient, QueryClientProvider } from 'react-query'
import AppRouter from './routes'
import 'antd/dist/antd.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  )
}

export default App
