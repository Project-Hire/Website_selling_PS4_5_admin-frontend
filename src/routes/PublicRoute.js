import { Route, Redirect } from 'react-router-dom'
import { isLogin } from '../config/function'
import { HOME } from '../config/path'

const PublicRoute = ({ component: Component, restricted, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? <Redirect to={HOME} /> : path ? <Component {...props} /> : <div>Not found</div>
      }
    />
  )
}

export default PublicRoute
