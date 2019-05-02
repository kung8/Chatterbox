import React, {Component} from 'react';
import {connect} from 'react-redux';
import socket from './Sockets'
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
        this.props.hamburgerToggleChatOnly()
        this.props.handleChatToggle()
        this.props.selectedFriend(user)
        const {id} = user;
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
        socket.emit('startChat',{room});
    }



    render(){
        const {chats,search} = this.props
        const userId = this.props.user.id
        const mappedChats = chats.filter(user=>{
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
        
        .map(user =>{
            return(
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center',marginTop:'5px'}}>
                    <div onClick={()=>this.startChat(userId,user)} key={user.id} style={{display:'flex', alignItems:'center',background:'orange',borderRadius:'10px',width:'98%',marginLeft:'1%'}}>
                        <img src={user.pic} style={{height:'50px',width:'50px',borderRadius:'50%',marginLeft:'10px',marginRight:'10px'}} alt='pic'/>
                        <h3 >{user.first} {user.last}</h3>
                        {/* <p>{user.message}</p>   */}
                        {/* add time and date*/}
                    </div>
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