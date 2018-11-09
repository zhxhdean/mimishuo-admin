import React from 'react'
import { Route, HashRouter as Router, Switch } from 'react-router-dom'

import Layout from './Layout'
import Index from './pages/Index'
import Authenticated from './components/Authenticated'
import Login from './pages/Login'
// 路由
export const rootRouter = (
  <Router>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Layout} />
    </Switch>
  </Router>
)

export const router = (
  <Authenticated>
  <Router>
    <Switch>
      <Route path="/index" component={Index} />
      <Route component={Index} />
    </Switch>
  </Router>
  </Authenticated>
)