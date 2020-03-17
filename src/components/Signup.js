import React from 'react'
import signup from '../assets/signup.png'


export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            message: ''
        }
    }

    switch_view = (evt) => {
        evt.preventDefault();
        this.props.toggle()
    }

    render() {
        return (
            <div className="d-flex flex-column">
                <div className="d-flex align-items-center flex-row 100vw m-2">
                    <div className="col-md-6" style={{ width: 300 }}>
                        <img src={signup} alt="Login" style={{ margin: 20 }} width={200} height={200} />
                    </div>
                    <div className="col-md-6" style={{ maxWidth: 400 }}>
                        <form className="text-center">
                            <h3 style={{ margin: 20 }}>Inscription</h3>
                            <div className="form-group">
                                <input type="text" className="form-control mb-3" placeholder="Nom" />
                                <input type="text" className="form-control mb-3" placeholder="Prenom" />
                                <input type="text" className="form-control mb-3" placeholder="Nom d'utilisateur" />
                                <input type="password" className="form-control mb-3" placeholder="Mot de passe" />
                                <input type="password" className="form-control mb-3" placeholder="Confirmation Mot de passe" />
                                <button type="submit" className="btn btn-success mb-3 btn-block">Enregistrer</button>
                            </div>
                            <p>Déjà inscrit ?  <a href="/" onClick={this.switch_view} > Se connecter </a></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}