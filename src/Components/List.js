import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';

class Message extends Component {
    constructor(){
        super();
        this.state={
            room:''
        }
    }
    
    startChat(id){
        this.socket=io();
        this.socket.emit('endChat',this.state.room);
        this.socket.emit('startChat',id);
    }

    render(){
        const {users} = this.props
        const mappedUsers = users.map(user =>{
            return(
                <div key={user.id}>
                    <h1 onClick={()=>this.startChat(user.id)}>
                        {user.first} {user.last}
                    </h1>
                </div>
            )
        })
        return(
            <div>
                {mappedUsers}
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        users:reduxState.users
    }
}

export default connect(mapStateToProps)(Message)