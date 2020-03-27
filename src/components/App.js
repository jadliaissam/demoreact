import React, { useState, useCallback, useContext } from 'react';
import Login from './Login';
import Signup from './Signup';
import Configuration from './Configuration'
import Dashboard from './Dashboard'
import Home from './Home'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile'


export const GeneralContext = React.createContext({})

const initialState = { user: null, server: null, theme: 'light' }

function Root(){
  const [config, setConfig] = useState(initialState)
  return (
    <GeneralContext.Provider value={{ config, updateContext: (data) => setConfig({ ...config, ...data }) }}>
      <App />
    </GeneralContext.Provider>
  )
}

export default Root;

function App() {
  const serverAdd = localStorage.getItem('server')
  //const [server, setServer] = useState(serverAdd !== null ? serverAdd : '')
  //const [theme, setTheme] = useState('light')
  const {config, updateContext} = useContext(GeneralContext)

//return <Profile user={{name : 'Alex'}} /> }

  return (
    <div>
        <BrowserRouter context={config}>
          <Switch>
            <Route path={ '/login'}>
              <Login />
            </Route>
            <Route exact path="/config">
              <Configuration />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
    </div>
  )
}



