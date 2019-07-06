import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from './Sockets'
import axios from 'axios';
import { updateChats, selectedFriend, updateRoom, updateSelectedIndProfile ,updateChatsAvailability} from './../ducks/reducer';

class Message extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount(){
        this.getChats()
        socket.on('updateActive',(active)=>{
            this.props.updateChatsAvailability(active)
        })
        socket.on('notifyReceived',()=>{
            this.getChats()
        })
        socket.on('chatEnded',()=>{
            this.getChats()
        })
    }

    getChats = async () => {
        const { id } = this.props.user;
        const users = await axios.get(`/api/chats/${id}`);
        this.props.updateChats(users.data)
        //will evenutally need to be converted to the message table on the SQL file
    }

    startChat(userId, user) {
        this.props.hamburgerToggleChatOnly()
        this.props.handleChatToggle()
        this.props.selectedFriend(user)
        this.props.updateSelectedIndProfile(user)
        const { id } = user;
        socket.emit('endChat', this.props.room);
        let bigger;
        let smaller;
        if (userId > id) {
            bigger = userId;
            smaller = id
        } else {
            bigger = id;
            smaller = userId;
        }
        let room = bigger + ':' + smaller;
        this.props.updateRoom(room)
        socket.emit('startChat', { room ,id, friend_id:userId});
    }

    render() {
        const { chats, search } = this.props
        const userId = this.props.user.id
        let availability
        const mappedChats = chats.filter(user => {
            const friendSearch = search.toLowerCase().split(' ')
            for (let i = 0; i < friendSearch.length; i++) {
                const searchName = friendSearch[i];
                if (!user.first.toLowerCase().includes(searchName) &&
                    !user.last.toLowerCase().includes(searchName)) {
                    return false
                }
            }
            return true
        })

            .map(user => {
                if (user.active === 'active') {
                    availability = 'green'
                } else if (user.active === 'busy') {
                    availability = 'yellow'
                } else {
                    availability = 'red'
                }
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '5px' }}>
                        <div onClick={() => this.startChat(userId, user)} key={user.id} style={{ display: 'flex', position:'relative',alignItems: 'center', background: '#29C9B8', borderRadius: '10px', width: '98%', marginLeft: '1%' }}>
                            <div style={{border:'1px solid black', width:50,height:50, borderRadius:'50%',marginLeft:10,background:'white',marginRight:10}}>
                                <img src={user.pic} style={{ height: '50px', width: '50px', borderRadius: '50%', left:10, marginRight: '10px' ,position:'absolute',zIndex:1}} alt='pic' />
                            </div>
                            <div style={{background:availability,height:'15px',width:'15px',borderRadius:'50%',boxShadow:'-1px -1px 3px 2px black',position:'absolute',left:45,top:35,zIndex:2}}></div>
                            <h3 >{user.first} {user.last}</h3>
                            {user.unread !== 0 && <div style={{border:'black 1px solid', display:'flex',justifyContent:'center',alignItems:'center',width:40, height:40, borderRadius:10,position:'absolute',right:5,background:'red'}}><p style={{fontSize:25, color:'white',fontWeight:700}}>{user.unread}</p></div>}
                        </div>
                    </div>
                )
            })
        return (
            <div>
                <h1 style={{ textAlign: 'center', background: '#303841', marginTop: 0, marginBottom: 0, color: 'white' }}>All Chats</h1>
                {mappedChats}
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        chats: reduxState.chats,
        user: reduxState.user,
        room: reduxState.room,
        friend: reduxState.friend
    }
}

export default connect(mapStateToProps, { updateChats, selectedFriend, updateRoom, updateSelectedIndProfile, updateChatsAvailability })(Message)