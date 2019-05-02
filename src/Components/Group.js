import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectedFriend,updateRoom} from '../ducks/reducer';
import socket from './Sockets'
import styled from 'styled-components';
import GroupAddList from './GroupAddList';
import GroupSelect from './GroupSelect';

class Group extends Component {
    constructor(){
        super();
        this.state={
            isGroupSelected:false,
            isUserSelected:false
        }
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

    handleIsGroupSelected=()=>{
        this.setState({
            isGroupSelected:!this.state.isGroupSelected
        })
    }

    render(){
        const userId = this.props.user.id;
        const {search,friends} = this.props
        const mappedfriends = friends.filter(user=>{
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
                    <GroupAddList key={user.id} user={user} />
                </div>
            )
        })
        return(
            <>
                <h1 style={{textAlign:'center',background:'#303841',marginTop:0,marginBottom:0,color:'white'}}>Groups</h1>
                <Users style={{maxHeight:'90%',minHeight:'40%',background:'lightgrey',overflowY:'scroll'}}>
                    <div style={{display:'flex', flexDirection:'column',justifyContent:'center',marginTop:'5px'}}>
                        <GroupSelect isGroupSelected={this.state.isGroupSelected} handleIsGroupSelected={this.handleIsGroupSelected}/>
                        {this.state.isGroupSelected&&
                            <>
                                <h1 style={{textAlign:'center',background:'#303841',marginBottom:0,marginTop:'5px',color:'white'}}>All Users</h1>
                                <Users style={{maxHeight:'40%',minHeight:'40%',background:'lightgrey',overflowY:'scroll'}}>
                                    {mappedfriends}
                                </Users>
                                <span style={{height:'10px',background:'#303841'}}></span>
                            </>                        
                        }
                    </div>
                    {/* <div style={{display:'flex', flexDirection:'column',justifyContent:'center',marginTop:'5px'}}>
                        <div style={{display:'flex', alignItems:'center',background:'lightgreen',borderRadius:'10px',width:'98%',marginLeft:'1%',position:'relative'}}>
                            <img style={{height:'50px',width:'50px',borderRadius:'50%',marginLeft:'10px',marginRight:'10px'}} alt='pic'/>
                            <h3 >Group 2</h3>
                            <Button style={{position:'absolute',right:'5px'}}>
                                <Plus className="fas fa-plus"/>
                            </Button>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column',justifyContent:'center',marginTop:'5px'}}>
                        <div style={{display:'flex', alignItems:'center',background:'#E6E6FA',borderRadius:'10px',width:'98%',marginLeft:'1%',position:'relative'}}>
                            <img style={{height:'50px',width:'50px',borderRadius:'50%',marginLeft:'10px',marginRight:'10px'}} alt='pic'/>
                            <h3 >Group 3</h3>
                            <Button style={{position:'absolute',right:'5px'}}>
                                <Plus className="fas fa-plus"/>
                            </Button>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column',justifyContent:'center',marginTop:'5px'}}>
                        <div style={{display:'flex', alignItems:'center',background:'yellow',borderRadius:'10px',width:'98%',marginLeft:'1%',position:'relative'}}>
                            <img style={{height:'50px',width:'50px',borderRadius:'50%',marginLeft:'10px',marginRight:'10px'}} alt='pic'/>
                            <h3 >Group 4</h3>
                            <Button style={{position:'absolute',right:'5px'}}>
                                <Plus className="fas fa-plus"/>
                            </Button>
                        </div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column',justifyContent:'center',marginTop:'5px'}}>
                        <div style={{display:'flex', alignItems:'center',background:'pink',borderRadius:'10px',width:'98%',marginLeft:'1%',position:'relative'}}>
                            <img style={{height:'50px',width:'50px',borderRadius:'50%',marginLeft:'10px',marginRight:'10px'}} alt='pic'/>
                            <h3 >Group 5</h3>
                            <Button style={{position:'absolute',right:'5px'}}>
                                <Plus className="fas fa-plus"/>
                            </Button>
                        </div>
                    </div> */}
                </Users>

                {/* <h1 style={{textAlign:'center',background:'#303841',marginBottom:0,color:'white'}}>All Users</h1>
                <Users style={{maxHeight:'40%',minHeight:'40%',background:'lightgrey',overflowY:'scroll'}}>
                    {mappedfriends}
                </Users> */}
            </>
        )
    }
} 

function mapStateToProps(reduxState){
    return{
        chats:reduxState.chats,
        user:reduxState.user,        
        friends:reduxState.friends,

    }
}

export default connect(mapStateToProps,{selectedFriend,updateRoom})(Group);

const Button = styled.button`
    height:65%;
    width:15%;
    border-radius:50%;
    background:#303841;
    border:#303841;
    &:focus {
        box-shadow: 0 0 1px 1px darkgrey;
        outline: none;
    }
`

const Plus = styled.i`
    font-size:25px;
    color:lightgrey;
`

const Users = styled.div`
::-webkit-scrollbar {
    width:0px
}
`