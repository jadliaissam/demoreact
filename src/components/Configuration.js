import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import imgConfig from '../assets/config.png'
import Alert from './Alert'

//import {useContext} from 'react'
//import { GeneralContext } from './App'

function Configuration() {
    const serverAdd = localStorage.getItem('server')
    const [ server, setServer ] = useState(serverAdd !== null ? serverAdd : '')
    const [message, setMessage] = useState('')
    const history = useHistory();
    //const { config, updateContext } = useContext(GeneralContext)

    function handleSave(evt) {
        evt.preventDefault();
        localStorage.setItem('server', server)
        setMessage("Settings saved successfully !")
        setTimeout(() => {
            history.push('/login')
        }, 1000)
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <img src={imgConfig} alt="Login" style={{ margin: 20 }} width={100} height={100} />
            <div className="col-md-6" style={{ maxWidth: 600 }}>
                <form className="text-center" onSubmit={(e) => handleSave(e)}>
                    <h3 className="title m-4">Configuration</h3>
                    <div className="form-group">
                        <input name="server" type="text" className="form-control mb-1" onChange={(e) => setServer(e.target.value)} value={server} placeholder="Enter Server Address" />
                    </div>
                    <button type="submit" className="btn btn-info m-2">Enregistrer</button>
                    <button onClick={() => history.goBack()} className="btn btn-danger">Cancel</button>
                </form>
            </div>
            <Alert cls="success" visible={message.length !== 0} message={message} timeout={5000} />
        </div>
    )
}


export default Configuration;