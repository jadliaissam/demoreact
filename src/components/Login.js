import React from 'react';
import {Redirect} from 'react-router-dom'
import login from '../assets/login.png'
import { fetchTokens } from "../api/auth"


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            message: '',
            rememberme: false,
            username: '',
            password: '',
            isLoggedIn : false
        }
    }

    handleLogin = async (evt) => {
        evt.preventDefault();
        if (this.state.username.length < 3 | this.state.password < 3)
            this.setState({ type: 'danger', message: "Please complete Authentication" })
        else {
            try{
                let res = await fetchTokens(this.state.username, this.state.password)
                switch(res.status){
                    case 200 : 
                        let data = await res.json()                        
                        localStorage.setItem('tokena', data.access)
                        localStorage.setItem('tokenr', data.refresh)
                        this.setState({ type: 'success', message: 'Login OK! ' })
                        setTimeout(()=> {this.setState({isLoggedIn: true})},1000)
                        break;
                    case 401:
                        this.setState({ type: 'danger', message: "Authentication Error", isLoggedIn : false })
                        break;
                    default:
                        break;
                }
            } catch (err) {
                this.setState({ type: 'danger', message: '' + err, isLoggedIn: false })
            }
        }
    }

    switch_view = (evt) => {
        evt.preventDefault();
        this.props.toggle()
    }

    clear = () => {
        this.setState({ type: '', message: '' })
    }

    handleRemMe = () => {
        localStorage.setItem('rememberme', !this.state.rememberme)
        this.setState({ rememberme: !this.state.rememberme })
    }

    handleInput = (evt) => {
        switch (evt.target.name) {
            case 'username': this.setState({ username: evt.target.value }); break;
            case 'password': this.setState({ password: evt.target.value }); break;
            default: break;
        }
    }

    render() {
        const { type, message, rememberme, username, password, isLoggedIn } = this.state
        let alert_color = "text-center alert alert-dismissible fade show alert-" + type
        return (
            <>
            {isLoggedIn ? <Redirect to={{ pathname: "/dashboard"}} /> :  (
            <div className="d-flex flex-column">
                <div className="d-flex align-items-center flex-row 100vw m-2">
                    <div className="col-md-6" style={{ width: 300 }}>
                        <img src={login} alt="Login" style={{ margin: 20 }} width={200} height={200} />
                    </div>
                    <div className="col-md-6" style={{ maxWidth: 400 }}>
                        <form className="text-center" onSubmit={this.handleLogin}>
                            <h3 className="title m-4">Connexion</h3>
                            <div className="form-group">
                                <input name="username" type="text" className="form-control mb-3"
                                    onChange={this.handleInput} value={username} placeholder="Enter Username" />
                                <input name="password" type="password" className="form-control mb-3"
                                    onChange={this.handleInput} value={password} placeholder="Enter password" />
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                        onChange={this.handleRemMe} checked={rememberme} id="customCheck1" />
                                    <label className="custom-control-label" onClick={this.handleRemMe}> Remember me </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-3">Se connecter</button>
                            <p>Pas encore inscrit ?</p>
                            <p><a href="/" onClick={this.switch_view}> Créer votre compte </a>
                            </p>
                        </form>
                    </div>
                </div>
                {message.length !== 0 && <div className={alert_color} role="alert"> {message}
                    <button className="close" onClick={() => this.clear()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                { isLoggedIn && <Redirect to={'/dashboard'}  />}
            </div>
            )}
            </>
        )
    }

}
