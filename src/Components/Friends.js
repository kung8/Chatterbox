import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateFriends,selectedFriend,updateRoom,updateSelectedIndProfile,updateFriendsAvailability} from '../ducks/reducer';
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
        socket.on('updateActive',(active)=>{
            this.props.updateFriendsAvailability(active)
        })
    }

    getFriends = async()=>{
        const {id} = this.props.user;
        let friends = await axios.get(`/api/friends/${id}`)
        friends = friends.data;
        this.props.updateFriends(friends)
    }

    startChat(userId,friend){
        this.props.hamburgerToggleChatOnly()
        this.props.handleChatToggle()
        this.props.selectedFriend(friend)
        this.props.updateSelectedIndProfile(friend)
        const {id} = friend;
        socket.emit('endChat',this.props.room);
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
        socket.emit('startChat',{room,id, friend_id:userId});
    }

    render(){
        const userId = this.props.user.id
        const {friends,search} = this.props
        console.log(friends)
        let availability
        const friendsArray = friends.filter(friend => {
            const friendSearch = search.toLowerCase().split(' ')
            for (let i = 0; i < friendSearch.length; i++) {
              const searchName = friendSearch[i];
              if (!friend.first.toLowerCase().includes(searchName) &&
                !friend.last.toLowerCase().includes(searchName)) {
                return false
              }
            }
            return true
          })
        
        
        .map(friend =>{
            if (friend.active === 'active') {
                availability = 'green'
            } else if (friend.active === 'busy') {
                availability = 'yellow'
            } else {
                availability = 'red'

            }
            return(
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center',marginTop:'5px'}}>
                    <div onClick={()=>this.startChat(userId,friend)} style={{display:'flex', alignItems:'center',background:'lightgrey',borderRadius:'10px',width:'98%',marginLeft:'1%',position:'relative'}}>
                        <img src={friend.pic} style={{height:'50px',width:'50px',borderRadius:'50%',marginLeft:'10px',marginRight:'10px'}} alt='pic'/>
                        <div style={{background:availability,height:'15px',width:'15px',borderRadius:'50%',boxShadow:'-1px -1px 3px 2px black',position:'absolute',left:45,top:35}}></div>
                        <h3>{friend.first} {friend.last}</h3>
                        {friend.unread !== 0 && <div style={{border:'black 1px solid', display:'flex',justifyContent:'center',alignItems:'center',width:40, height:40, borderRadius:10,position:'absolute',right:5,background:'red'}}><p style={{fontSize:25, color:'white',fontWeight:700}}>{friend.unread}</p></div>}
                    </div>
                </div>
            )    
        })
        return(
            <div>
                <h1 style={{textAlign:'center',background:'#303841',marginTop:0,marginBottom:0,color:'white'}}>All Users</h1>
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

export default connect(mapStateToProps,{updateFriends,selectedFriend,updateRoom,updateSelectedIndProfile,updateFriendsAvailability})(Friends)