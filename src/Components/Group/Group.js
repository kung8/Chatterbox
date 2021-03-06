import React, {Component,memo} from 'react';
import {connect} from 'react-redux';
import {selectedFriend,updateRoom,updateGroups} from '../../ducks/reducer';
import socket from '../Sockets'
import styled from 'styled-components';
import GroupAddList from './GroupAddList';
import GroupSelect from './GroupSelect';
import axios from 'axios';
import IndGroup from './IndGroup';

class Group extends Component {
    constructor(){
        super();
        this.state={
            isGroupSelected:false,
            isUserSelected:false,
            group:[],
            groupName:false,
            name:'',
            groups:[]
        }
    }
    
    componentDidMount(){
        this.getAllGroups()
    }

    getAllGroups=async()=>{
        const {id} = this.props.user
        let groups = await axios.get(`api/chats/group/getAll/${id}`)
        this.props.updateGroups(groups.data)
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
        socket.emit('startGroupChat',{room});
    }

    handleIsGroupSelected=()=>{
        this.setState({
            isGroupSelected:!this.state.isGroupSelected,
            groupName:true
        })
    }

   handleAddUserToGroup=async(user,selected)=>{
        const {id} = user;
        if(selected){
            await this.setState({
                group:[...this.state.group,id]
            })
        } else {
            const found = this.state.group.filter(num=>{return num !== +id})
            this.setState({
                group:found
            })
        }
        // console.log(this.state.group)
    }

    createGroup=async()=>{
        const {group,name} = this.state
        const {id} = this.props.user
        if(group.length < 2){
            alert('Group chats are meant for more than two users, please add an additional user')
        } else if (name.charAt(0) =='') {
            alert('Please create a group name')
        } 
        else {
            group.unshift(id)
            await axios.post('/api/chat/group/create',{group,name})
        }
    }

    handleGroupNameCreation=(value)=>{
        this.setState({
            name:value
        })
    }

    render(){
        const userId = this.props.user.id;
        const {search,friends,groups} = this.props

        const mappedGroups = groups.map(group=>{
            return(
                <IndGroup 
                    key={group.group_users_id} 
                    group={group}
                    hamburgerToggleChatOnly={this.props.hamburgerToggleChatOnly}
                    handleChatToggle={this.props.handleChatToggle} />
            )
        })

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
                <div style={{display:'flex', flexDirection:'column',justifyContent:'center',marginTop:5}}>
                    <GroupAddList key={user.id} user={user} handleAddUserToGroup={this.handleAddUserToGroup}/>
                </div>
            )
        })
        return(
            <div>
                <h1 style={{
                        textAlign:'center',
                        background:'#303841',
                        marginTop:0,
                        marginBottom:0,
                        color:'white'}}>Groups</h1>
                <Users style={{maxHeight:'90%',minHeight:'90%',overflowY:'scroll'}}>
                    <div 
                        style={{
                            display:'flex', 
                            flexDirection:'column',
                            justifyContent:'center',
                            marginTop:'5px'}}>
                        <Users style={{minHeight:'40%',overflowY:'scroll'}}>
                            {mappedGroups}
                        </Users>
                    </div>
                
                    <div style={{
                        display:'flex', 
                        flexDirection:'column',
                        justifyContent:'center',
                        }}>
                        <GroupSelect 
                            handleGroupNameCreation={this.handleGroupNameCreation} 
                            groupName={this.state.groupName} 
                            isGroupSelected={this.state.isGroupSelected} 
                            handleIsGroupSelected={this.handleIsGroupSelected} 
                            createGroup={this.createGroup}/>
                        {this.state.isGroupSelected&&
                            <>
                                <h1 style={{textAlign:'center',background:'#303841',marginBottom:0,marginTop:'5px',color:'white'}}>Add Users</h1>
                                <Users style={{maxHeight:'40%',minHeight:'40%',background:'#303841',overflowY:'scroll'}}>
                                    {mappedfriends}
                                </Users>
                                <span style={{height:'10px',background:'#303841',marginTop:5}}></span>
                            </>                        
                        }
                    </div>
                    
                </Users>
            </div>
        )
    }
} 

function mapStateToProps(reduxState){
    return{
        chats:reduxState.chats,
        user:reduxState.user,        
        friends:reduxState.friends,
        groups:reduxState.groups
    }
}

export default memo(connect(mapStateToProps,{selectedFriend,updateRoom,updateGroups})(Group));

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