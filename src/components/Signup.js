import React, { useState, useContext } from 'react';
import signup from '../assets/signup.png'
import { Link, useHistory } from 'react-router-dom';
import Alert from './Alert';
import { LoadingIndicator } from './utils'
import { registerUser } from '../api/auth'
import {GeneralContext} from './App'

export default function SignUp(props) {
    const [message, setMessage] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory();
    const context = useContext(GeneralContext)

    function display_alert(type, msg) {
        if (type === 1) {
            setError(msg); setMessage('')
        } else {
            setError(''); setMessage(msg)
        }
    }

    async function processLogin() {
        if (fname.length < 3 | lname < 3 | username.length < 3) return display_alert(1, "Please complete Registration Details")
        var strongRegex = new RegExp("^(?=.*[a-z])")//(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{1,})");
        if (!strongRegex.test(password)) return display_alert(1, "Please choose a strong password ")
        if (passwordConfirm !== password) return display_alert(1, 'Password and confirmation must match !')
        registerUser({ username, password, first_name: fname, last_name: lname }).then(result => {
            const { status, error } = result
            console.log({ status, error } );

            if (status === 201){
                
                display_alert(2, "Registration OK !")
                setTimeout(()=>{
                    history.push('/login')
                }, 1000)
            } else
                display_alert(1, '' + error)
        }).catch(err => display_alert(1, ''+err))
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
                        <img src={signup} alt="Login" style={{ margin: 20 }} width={200} height={200} />
                    </div>
                    <div className="col-md-6" style={{ maxWidth: 400 }}>
                        <form className="text-center" onSubmit={handleLogin}>
                            <h3 style={{ margin: 20 }}>Inscription</h3>
                            <div className="form-group">
                                <input type="text" onChange={(e) => setFname(e.target.value)} value={fname} className="form-control mb-3" placeholder="Nom" />
                                <input type="text" onChange={(e) => setLname(e.target.value)} value={lname} className="form-control mb-3" placeholder="Prenom" />
                                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} className="form-control mb-3" placeholder="Nom d'utilisateur" />
                                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control mb-3" placeholder="Mot de passe" />
                                <input type="password" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} className="form-control mb-3" placeholder="Confirmation Mot de passe" />
                                <Alert cls="success" visible={password.length > 8 && password === passwordConfirm} message={"Match !"} timeout={5000} />
                                <button type="submit" className="btn btn-success mb-3 btn-block">Enregistrer</button>
                            </div>
                            <p>Déjà inscrit ?  <Link to="/login" > Se connecter </Link></p>
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