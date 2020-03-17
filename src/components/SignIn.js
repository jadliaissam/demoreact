import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import Signup from './Signup'

import {Redirect} from 'react-router-dom'

export default class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show_login: true
        }
    }

    handleClick = () => {
        this.setState({ show_login: !this.state.show_login })
    }

    render() {
        return (
            <div className="d-flex justify-content-center flex-column align-items-center vh-100">
                {
                    this.state.show_login ?
                        <Login toggle={this.handleClick} /> :
                        <Signup toggle={this.handleClick} />
                }
                <p className="text-center mt-3 pt-3">Demo React App By Aissam</p>
            </div>
        )
    }
}