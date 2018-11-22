import React from 'react'
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'

// component
import Layout from './Layout'
import Index from './pages/Index'
import Authenticated from './components/Authenticated'
import Login from './pages/Login'
import UserInformation from './pages/UserInformation'
import PassWord from './pages/PassWord'
import SecretList from './pages/SecretList'
import SecretDetail from './pages/SecretDetail'
// store
import loginStore from './pages/Login/store'
import rootStore from './store'
import authenticateStore from './components/Authenticated/store'
import userInformationStore from './pages/UserInformation/store'
import passWordStore from './pages/PassWord/store'
import secretListStore from './pages/SecretList/store'
import secretDetailStore from './pages/SecretDetail/store'
import pendingListStore from './components/NewsLetterPendingList/store'
import { BackTop } from 'antd'
const stores = {
  rootStore,
  loginStore,
  authenticateStore,
  userInformationStore,
  passWordStore,
  secretListStore,
  secretDetailStore,
  pendingListStore
}

// for debug
window.__APP_STATE__ = stores

// 路由
export const rootRouter = (
  <Provider {...stores}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  </Provider>
)

export const router = (
  <Authenticated>
    <BackTop />
    <Router>
      <Switch>
        <Route path="/index" component={Index} />
        <Route path="/userinfo" component={UserInformation} />
        <Route path="/changepassword" component={PassWord} />
        <Route path="/secret/detail/:id" component={SecretDetail} />
        <Route path="/secret" component={SecretList} />
        <Route component={Index} />
      </Switch>
    </Router>
  </Authenticated>
)
