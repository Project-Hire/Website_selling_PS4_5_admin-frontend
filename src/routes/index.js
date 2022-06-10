import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { HOME } from '../config/path'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import routes from './routes'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          {routes.map((route, key) => {
            const { path, exact, isPrivate, component, restricted } = route

            const props = {
              key,
              path,
              exact,
              component: lazy(() => new Promise((resolve) => setTimeout(() => resolve(component), 200))),
            }

            return isPrivate ? <PrivateRoute {...props} /> : <PublicRoute restricted={restricted} {...props} />
          })}
          <PrivateRoute component={HOME} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
