import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateFriends,selectedFriend} from '../ducks/reducer';
import io from 'socket.io-client';

class Friends extends Component {
    constructor(){
        super();
        this.state={
            room:''
        }
    }
    
    componentDidMount(){
        this.getFriends()
    }

    getFriends = async() => {
        const {id} = this.props.user;
        const users = await axios.get(`/api/users/${id}`);
        this.props.updateFriends(users.data)
        //will need to get off of a friends table eventually but for now we will just do all users 
    }    

    startChat(userId,friend){
        console.log(userId,friend)
        this.props.selectedFriend(friend);
        const {id} = friend;
        this.socket=io();
        this.socket.emit('endChat',this.state.room);
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
        this.setState({
            room:room
        })
        this.socket.emit('startChat',{room});
    }

    render(){
        console.log(this.props.friends)
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
        friends:reduxState.friends
    }
}

export default connect(mapStateToProps,{updateFriends,selectedFriend})(Friends)