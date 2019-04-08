import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateFriends,selectedFriend,updateRoom} from '../ducks/reducer';
import io from 'socket.io-client';

class Friends extends Component {
    constructor(){
        super();
        this.state={

        }
    }
    
    componentDidMount(){
        this.getFriends()
        this.socket=io('http://localhost:8888', {transports: ['websocket']});
        console.log('we here now')
            this.socket.on('test',messages =>{
                console.log('hit socket again')
                this.startChat('startChat',messages)            
            
            });
        this.socket.on('sendMsg',messages =>{
            console.log('entering send',messages)
            this.setState({
                messages:messages.data,
                message:''
            })
        })
    }

    // startChat=(messages)=>{
    //     this.setState({
    //         messages:messages.data
    //     })
    // }

    getFriends = async() => {
        const {id} = this.props.user;
        const users = await axios.get(`/api/friends/${id}`);
        this.props.updateFriends(users.data)
        //will need to get off of a friends table eventually but for now we will just do all users 
    }    

    startChat(userId,friend){
        console.log('hi')
        this.props.selectedFriend(friend);
        const {id} = friend;
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
        console.log('made it this far')
        this.socket.emit('startChat',{room});
    }

    render(){
        const userId = this.props.user.id
        const {friends} = this.props;
        const mappedFriends = friends.map(friend=>{
            return(
                <div key={friend.id}>
                    <h1 onClick={()=>this.startChat(userId,friend)}>{friend.first} {friend.last}</h1>
                </div>
            )
        })
        return(
            <div>
                {mappedFriends}
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        chats:reduxState.chats,
        user:reduxState.user,
        friends:reduxState.friends,
        room:reduxState.room

    }
}

export default connect(mapStateToProps,{updateRoom,updateFriends,selectedFriend})(Friends)