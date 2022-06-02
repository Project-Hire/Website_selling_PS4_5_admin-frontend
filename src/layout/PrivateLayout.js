import PrivateRoute from '../routes/PrivateRoute'

const PrivateLayout = ({ children }) => {
  return (
    <PrivateRoute>
      <div>{children}</div>
    </PrivateRoute>
  )
}

export default PrivateLayout
