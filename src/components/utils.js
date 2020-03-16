import React from 'react'

export class Alert extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            message : this.props.message,
            type : this.props.type
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({message : ''})
            this.props.clear()
        }, 5000)
    }
    
    render() { 
        const {type, message } = this.state
        let className = "text-center alert alert-dismissible fade show alert-"+type
        return (
        <div>
             { message.length !== 0 && 
                <div className={className} role="alert">
                    {message}
                    <button className="close" onClick={()=> {this.setState({message:""});  this.props.clear()}}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> }
        </div>
        )        
    }
}