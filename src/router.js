import React from 'react'
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import {Provider} from 'mobx-react'

// component
import Layout from './Layout'
import Index from './pages/Index'
import Authenticated from './components/Authenticated'
import Login from './pages/Login'
import UserInformation from './pages/UserInformation'
import PassWord from './pages/PassWord'


// store
import loginStore from './pages/Login/store'
import rootStore from './store'
import authenticateStore from './components/Authenticated/store'
import userInformationStore from './pages/UserInformation/store'
import passWordStore from './pages/PassWord/store'
const stores = {
  rootStore,
  loginStore,
  authenticateStore,
  userInformationStore,
  passWordStore
}

// for debug
window.__APP_STATE__ = stores

// 路由
export const rootRouter = (
  <Provider {...stores}>
  <Router>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Layout} />
    </Switch>
  </Router>
  </Provider>
)

export const router = (
  <Authenticated>
  <Router>
    <Switch>
      <Route path="/index" component={Index} />
      <Route path="/userinfo" component={UserInformation} />
      <Route path="/changepassword" component={PassWord} />
      <Route component={Index} />
    </Switch>
  </Router>
  </Authenticated>
)