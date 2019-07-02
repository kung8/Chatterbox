import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectedFriend,updateRoom,updateSelectedIndProfile} from '../ducks/reducer';
import socket from './Sockets'

class Individuals extends Component {
    constructor(){
        super();
        this.state={

        }
    }
    
    startChat(userId,user){
        this.props.hamburgerToggleChatOnly()
        this.props.handleChatToggle()
        this.props.selectedFriend(user)
        this.props.updateSelectedIndProfile(user)
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
        const userId = this.props.user.id;
        const {search,chats} = this.props
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
          }).map(user =>{
            return(
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center',marginTop:'5px'}}>
                    <div onClick={()=>this.startChat(userId,user)} key={user.id} style={{display:'flex', alignItems:'center',background:'orange',borderRadius:'10px',width:'98%',marginLeft:'1%'}}>
                        <img src={user.pic} style={{height:'50px',width:'50px',borderRadius:'50%',marginLeft:'10px',marginRight:'10px'}} alt='pic'/>
                        <h3 >{user.first} {user.last}</h3>
                    </div>
                </div>
            )
        })
        return(
            <div>
                <h1 style={{textAlign:'center',background:'#303841',marginTop:0,marginBottom:0,color:'white'}}>Individuals</h1>
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

export default connect(mapStateToProps,{selectedFriend,updateRoom,updateSelectedIndProfile})(Individuals);