import React from 'react'

export default class Dashboard extends React.Component {

    render(){
        return <div>
ezeze
            <button onClick={()=>{
                localStorage.clear()
            }}>Logout </button>
        </div>
    }
}