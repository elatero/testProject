import React, { FC } from 'react'
import { Route, RouteProps } from 'react-router-dom'

type Props = RouteProps & {
  component: FC
}

const PublicRoute = (props: Props) => {
  const { component: Component, ...rest } = props
  return <Route {...rest} render={(props) => <Component {...props} />} />
}

export default PublicRoute
