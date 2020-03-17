import React from 'react';
import { Redirect } from 'react-router-dom'
import config from '../assets/config.png'
import { fetchTokens } from "../api/auth"


export default class Configuration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            message: '',
            server: localStorage.getItem('server'),
            exit: false
        }
    }

    handleSave = (evt) => {
        evt.preventDefault();
        localStorage.setItem('server', this.state.server)
        this.setState({ type: 'success', message: 'Saved successufully !' })
        setTimeout(() => {
            this.setState({ exit: true })
        }, 1000)
    }

    handleChange = (evt) => {
        this.setState({ server: evt.target.value })
    }


    render() {
        const { type, message, server, exit } = this.state
        let alert_color = "text-center alert alert-dismissible fade show alert-" + type
        return (
                <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                <img src={config} alt="Login" style={{ margin: 20 }} width={100} height={100} />
                    <div className="" style={{ maxWidth: 400 }}>
                        <form className="text-center" onSubmit={this.handleSave}>
                            <h3 className="title m-4">Configuration</h3>
                            <div className="form-group">
                                <input name="server" type="text" className="form-control mb-1" onChange={this.handleChange} value={server} placeholder="Enter Server Address" />
                            </div>
                            <button type="submit" className="btn btn-info m-2">Enregistrer</button>
                            <button onClick={() => this.setState({ cancel: true })} className="btn btn-danger">Cancel</button>
                        </form>
                    </div>
                {exit ? <Redirect to={{ pathname: '/login' }} /> : null}
                {message.length !== 0 && <div className={alert_color} role="alert"> {message}
                    <button className="close" onClick={() => this.clear()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
            </div>
        )
    }

}
