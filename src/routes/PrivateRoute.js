import { Route, Redirect, useLocation } from 'react-router-dom'
import { isLogin } from '../config/function'
import { ADMIN_LOGIN } from '../config/path'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLogin() ? <Redirect to={ADMIN_LOGIN} /> : path ? <Component {...props} /> : <div>Not Found</div>
      }
    />
  )
}

export default PrivateRoute