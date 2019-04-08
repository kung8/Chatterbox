import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import {updateChats,selectedFriend,updateRoom} from './../ducks/reducer';

class Message extends Component {
    constructor(){
        super();
        this.state={
        }
    }

    componentDidMount(){
        this.getChats()
    }

    getChats = async() => {
        const {id} = this.props.user;
        const users = await axios.get(`/api/chats/${id}`);
        this.props.updateChats(users.data)
        //will evenutally need to be converted to the message table on the SQL file
    }    

    startChat(userId,user){
        this.props.selectedFriend(user)
        const {user_id:id} = user;
        this.socket=io();
        this.socket.emit('endChat',this.props.room);
        let bigger;
        let smaller;
        if(userId > id){
            bigger = userId;
            smaller = id
        } else {
            bigger = id;
            smaller = userId;
        } 
        let room = bigger+':'+smaller;
        this.props.updateRoom(room)
        this.socket.emit('startChat',{room});
    }



    render(){
        const {chats} = this.props
        const userId = this.props.user.id
        const mappedChats = chats.map(user =>{
            return(
                <div key={user.id}>
                    <h1 onClick={()=>this.startChat(userId,user)}>
                        {user.first} {user.last}
                    </h1>
                    <p>{user.message}</p>  
                    {/* add time and date*/}
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
        user:reduxState.user,
        room:reduxState.room,
        friend:reduxState.friend
    }
}

export default connect(mapStateToProps,{updateChats,selectedFriend,updateRoom})(Message)