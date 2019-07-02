import React, {Component} from 'react';
import Nav from './Nav';
import Message from './Message';
import Chat from './Chat';
import Profile from './Profile';
import Group from './Group';
import List from './List';
import styled from 'styled-components';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateChats,updateUser} from './../ducks/reducer';
import GroupChat from './GroupChat';

class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            messageType:Group,
            name:'Group', 
            messages:[],
            isHamburgerOpened:false,
            isChatClicked:false,
            isProfileOpened:false,
            isMessageOpened:true
        }
    }

    componentDidMount(){
        this.current()
    }

    current = async() => {
        const {id} = this.props.user;
        if(!id){
            try{
                const user = await axios.post('/api/user/current');
                this.props.updateUser(user.data)
            } catch(err){
                this.props.history.push('/')
            }
        } 
    }

    updateState=(value,name)=>{
        if(this.state.isHamburgerOpened){
            this.setState({
                isHamburgerOpened:false
            })
        }
        this.setState({
            messageType:value,
            name
        })
    }

    handleHamburgerToggle=async()=>{
        await this.setState({
            isHamburgerOpened:!this.state.isHamburgerOpened
        })
    }

    hamburgerToggleChatOnly=()=>{
        if(this.state.isHamburgerOpened){
            this.setState({
                isHamburgerOpened:false
            })
        }
    }

    handleChatToggle=async()=>{
        if(this.state.isProfileOpened){
            await this.setState({
                isProfileOpened:false,
            })
        }
        this.setState({
            isChatClicked:!this.state.isChatClicked,
            isMessageOpened:!this.state.isMessageOpened
        })
    }

    handleProfileToggle=async()=>{
        await this.setState({
            isProfileOpened:!this.state.isProfileOpened,
            isChatClicked:!this.state.isChatClicked
        })
    }

    render(){
        return(
            <Dash>
                <Nav 
                    updateState={this.updateState} 
                    messageType={this.state.messageType} 
                    isHamburgerOpened={this.state.isHamburgerOpened} 
                    handleHamburgerToggle={this.handleHamburgerToggle} 
                    isChatClicked={this.state.isChatClicked}/>
                <Message 
                    name={this.state.name}
                    isMessageOpened={this.state.isMessageOpened} 
                    messageType={this.state.messageType} 
                    isHamburgerOpened={this.state.isHamburgerOpened} 
                    handleHamburgerToggle={this.handleHamburgerToggle} 
                    isChatClicked={this.state.isChatClicked} 
                    handleChatToggle={this.handleChatToggle} 
                    hamburgerToggleChatOnly={this.hamburgerToggleChatOnly} 
                    isProfileOpened={this.state.isProfileOpened}/>
                {Object.keys(this.props.friend).length === 0 ?
                    <GroupChat 
                        isChatClicked={this.state.isChatClicked} 
                        handleChatToggle={this.handleChatToggle} 
                        handleProfileToggle={this.handleProfileToggle}  
                        isProfileOpened={this.state.isProfileOpened}/>
                        :
                    <Chat 
                        isChatClicked={this.state.isChatClicked} 
                        handleChatToggle={this.handleChatToggle} 
                        handleProfileToggle={this.handleProfileToggle}  
                        isProfileOpened={this.state.isProfileOpened}/>}
                <Profile 
                    isProfileOpened={this.state.isProfileOpened} 
                    handleProfileToggle={this.handleProfileToggle}/>
            </Dash>
        )
    }
}

function mapStateToProps(reduxState){

    return{
        chats:reduxState.chats,
        user:reduxState.user,
        friend:reduxState.friend,
        selectedGroup:reduxState.selectedGroup
    }
}

export default connect(mapStateToProps,{updateChats,updateUser})(Dashboard)



//////////////////////////////////////////////STYLING COMPONENTS BELOW///////////////////////////////////////////

const Dash = styled.div`
    display:flex;
    width:100%;
    background:#5d697f;
    justify-content:center;
    overflow:hidden;
`