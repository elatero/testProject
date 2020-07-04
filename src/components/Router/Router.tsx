import React from 'react'
import { Switch } from 'react-router-dom'
import PublicRoute from './PublicRoute'
import ProtectedRoute from './ProtectedRoute'
import features from '../../features'

export const Router = () => {
  return (
    <Switch>
      <PublicRoute path='/login' component={features.authentication.pages.Authentication} />
      <ProtectedRoute path='/' component={features.listContact.pages.ListContact} />
    </Switch>
  )
}
