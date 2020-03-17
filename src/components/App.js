import React from 'react';
import SignIn from './SignIn';
import Configuration from './Configuration'
import Dashboard from './Dashboard'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

export const GeneralContext = React.createContext()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      tokena : null,
      tokenr : null
    }
  }

  render() {
    return (
      <BrowserRouter>
        <GeneralContext.Provider value={this.state}>
          <Switch>
            <Route exact path="/dashboard">
              {this.state.isLoggedIn ? < Dashboard /> : <Redirect to={{ pathname: "/login" }} />}
            </Route>
            <Route exact path="/config">
              <Configuration />
            </Route>
            <Route path="/login">
              {this.state.isLoggedIn ? < Dashboard /> : <SignIn />}
            </Route>
          </Switch>
        </GeneralContext.Provider>
      </BrowserRouter>
    )
  }
}

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


export default App;
