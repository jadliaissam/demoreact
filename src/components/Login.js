import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import login from '../assets/login.png'
import { fetchTokens } from "../api/auth"
import Alert from './Alert';
import { GeneralContext } from './App'
import { LoadingIndicator } from './utils'

export default function Login(props) {
  const [rememberMe, setRemermberMe] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { config, updateContext } = useContext(GeneralContext)
  const history = useHistory();

  function display_alert(type, msg) {
    if (type === 1) {
      setError(msg); setMessage('')
    } else {
      setError(''); setMessage(msg)
    }
  }

  function processLogin() {
    if (username.length < 3 | password < 3) return display_alert(1, "Please complete Authentication Details")
    fetchTokens(username, password).then(result => {      
      const { status, error, data } = result
      if (status !== 200) { display_alert(1, error); return updateContext({user : null})}
      if (rememberMe) {
        localStorage.setItem('tokena', data.access)
        localStorage.setItem('tokenr', data.refresh)
      }
      display_alert(2, 'Authentication Success !! ')
      updateContext({user : {name: 'Alex Robert'}})
      setTimeout(() => { history.push('/dashboard'); }, 500)
    })
  }

  async function handleLogin(evt) {
    evt.preventDefault();
    setIsLoading(true)
    processLogin()
    setIsLoading(false)
  }

  return (
    <div className="d-flex justify-content-center flex-column align-items-center vh-100">
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center flex-row 100vw m-2">
          <div className="col-md-6" style={{ width: 300 }}>
            <img src={login} alt="Login" style={{ margin: 20 }} width={200} height={200} />
          </div>
          <div className="col-md-6" style={{ maxWidth: 400 }}>
            <form className="text-center" onSubmit={(e) => handleLogin(e)}>
              <h3 className="title m-4">Connexion</h3>
              <div className="form-group">
                <input name="username" type="text" className="form-control mb-3" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter Username" />
                <input name="password" type="password" className="form-control mb-3" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password" />
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" name="rememberme" className="custom-control-input" onChange={(e) => setRemermberMe(!rememberMe)} checked={rememberMe} id="customCheck1" />
                  <label className="custom-control-label" onClick={() => setRemermberMe(!rememberMe)}> Remember me </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block mb-3">Se connecter</button>
              <p>Pas encore inscrit ?</p>
              <p><Link to="/signup" > Créer votre compte </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      {
        isLoading ? <LoadingIndicator /> : (
          <>
            <Alert cls="danger" visible={error.length !== 0} message={error} timeout={5000} />
            <Alert cls="success" visible={message.length !== 0} message={message} timeout={5000} />
          </>
        )
      }

    </div>
  )
}