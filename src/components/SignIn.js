import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Alert} from './utils'
import {fetchTokens} from "../api/auth"

export default class SignIn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            show_login : true
        }
    }

    handleClick = () => {
        this.setState({ show_login : ! this.state.show_login})
    }

    render(){
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                {
                this.state.show_login ? 
                <Login toggle={this.handleClick}/> : 
                <SignUp toggle={this.handleClick}/>
                }
            </div>
        )
    }
} 


class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error : '',
            message : '',
            rememberme: false,
            username : '',
            password : '',
        }
    }

    check_tokens = ()=> {
        return localStorage.getItem('tokenr') != null
    }

    handleLogin = async (evt) => {
        evt.preventDefault();
        if(this.state.username.length < 3 | this.state.password < 3)
            this.setState({error: "Please complete Authentication credentiels"})
        else {
            try{
                let res = await fetchTokens(this.state.username, this.state.password)
                if(res.result)
                    this.setState({message : 'Login OK! '})
                else
                    this.setState({error : res.error})
            } catch(err){
                this.setState({error : 'Error : '+err})
            }   
        }     
    }

    switch_view = (evt)=> {
        evt.preventDefault();
        this.props.toggle()
    }

    clear = () => {
        this.setState({error : '', message : ''})
    }

    handleRemMe = () => {
        this.setState({rememberme : ! this.state.rememberme})
    }

    handleInput = (evt) => {
        console.log(evt.target.name);
        
        switch(evt.target.name){
            case 'username': this.setState({username : evt.target.value}); break;
            case 'password': this.setState({password : evt.target.value}); break;
            default : break;
        }            
    }

    render(){
        const {error, message, rememberme, username, password} = this.state
        return (
        <div className="50vh 50vw">        
        <form className="text-center" onSubmit={this.handleLogin}>
        <h3 className="title m-4">Connexion</h3>
            <div className="form-group">
                <input name="username" type="text" className="form-control mb-3" 
                        onChange={this.handleInput} value={username} placeholder="Enter Username"  />
                <input name="password" type="password" className="form-control mb-3" 
                        onChange={this.handleInput} value ={password} placeholder="Enter password" />
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input"
                           onChange={this.handleRemMe} checked={rememberme} id="customCheck1"/>
                    <label className="custom-control-label" onClick={this.handleRemMe}> Remember me </label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-3">Se connecter</button>
            <p>Pas encore inscrit ?  
                <a href="/" onClick={this.switch_view}> Créer votre compte </a>
            </p>
        </form>
        { error.length !== 0 ? <Alert type="danger" clear={this.clear} message={error}/> :
         message.length !== 0 ? <Alert type="success" clear={this.clear} message={message}/>: null}
        </div>
        )
    }

}


class SignUp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error : '',
            message : ''
        }
    }

    switch_view = (evt)=> {
        evt.preventDefault();
        this.props.toggle()
    }

    render(){
        return (
            <div style={{width:300}}>        
            <form className="text-center">
                <h3 style={{margin:20}}>Inscription</h3>
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
        )
    }
}