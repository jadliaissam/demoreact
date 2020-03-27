import React, { useContext } from 'react'
import { GeneralContext } from './App'
import { useHistory, Link } from 'react-router-dom';

export default function Header(props) {
  const { config, updateContext } = useContext(GeneralContext)
  const history = useHistory()

  function handleLogout() {
    updateContext({ user: null });
    history.push('/login')
  }

  return (
    <div className="text-center d-flex flex-row-reverse justify-content-between m-3">
      <div className="">
        <Link to="/profile">
          <img src={"https://via.placeholder.com/60"} alt="Avatar" className="rounded-circle" />
        </Link>
        <p>{props.user.name}</p>
      </div>
      <h1>DASHBOARD</h1>
      <div className="">
        <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  )
}