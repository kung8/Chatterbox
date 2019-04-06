import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import {updateChats} from './../ducks/reducer';

class Message extends Component {
    constructor(){
        super();
        this.state={
            room:''
        }
    }

    componentDidMount(){
        this.getChats()
    }

    getChats = async() => {
        const {id} = this.props.user;
        const users = await axios.get(`/api/users/${id}`);
        this.props.updateChats(users.data)
        //will evenutally need to be converted to the message table on the SQL file
    }    

    startChat(userId,id){
        console.log(userId,id)
        this.socket=io();
        this.socket.emit('endChat',this.state.room);
        this.socket.emit('startChat',id);
    }

    render(){
        const {chats} = this.props
        const userId = this.props.user.id
        const mappedChats = chats.map(user =>{
            return(
                <div key={user.id}>
                    <h1 onClick={()=>this.startChat(userId,user.id)}>
                        {user.first} {user.last}
                    </h1>
                </div>
            )
        })
        return(
            <div>
                {mappedChats}
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        chats:reduxState.chats,
        user:reduxState.user
        
    }
}

export default connect(mapStateToProps,{updateChats})(Message)