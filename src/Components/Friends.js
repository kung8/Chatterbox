import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateFriends,selectedFriend,updateRoom} from '../ducks/reducer';
import socket from './Sockets'

class Friends extends Component {
    constructor(){
        super();
        this.state={
            friends:[]
        }
    }
    
    componentDidMount(){
        this.getFriends()
    }

    getFriends = async()=>{
        const {id} = this.props.user;
        // console.log(id)
        let friends = await axios.get(`/api/friends/${id}`)
        console.log(friends.data)
        // console.log(friends.data)
        friends = friends.data;
        this.props.updateFriends(friends)
    }

    startChat(userId,friend){
        this.props.selectedFriend(friend)
        const {id} = friend;
        // console.log(this.props.room)
        socket.emit('endChat',this.props.room);
        // console.log(this.props.room)
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
        socket.emit('startChat',{room});
    }

    render(){
        const userId = this.props.user.id
        // console.log(this.props.friend)
        const {friends} = this.props
        const friendsArray = friends.map(friend =>{
            return(
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center',marginTop:'5px'}}>
                    <div onClick={()=>this.startChat(userId,friend)} style={{display:'flex', alignItems:'center',background:'orange',borderRadius:'16px',width:'98%',marginLeft:'1%'}}>
                        <img src={friend.pic} style={{height:'50px',width:'50px',borderRadius:'50%',marginLeft:'10px',marginRight:'10px'}} alt='pic'/>
                        <h3>{friend.first} {friend.last}</h3>
                    </div>
                </div>
            )    
        })
        return(
            <div>
                {friendsArray}
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return{
        user:reduxState.user,
        friend:reduxState.friend,
        friends:reduxState.friends,
        room:reduxState.room
    }
}

export default connect(mapStateToProps,{updateFriends,selectedFriend,updateRoom})(Friends)