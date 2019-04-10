import React, {Component} from 'react';
import Nav from './Nav';
import Message from './Message';
import Chat from './Chat';
import Profile from './Profile';
import Friends from './Friends';
import styled from 'styled-components';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateChats,updateUser} from './../ducks/reducer';

class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            messageType:Friends, 
            messages:[
                {
                    id:1,
                    message:'Hey I wanted to tell you something',
                    username:'Hermione'
                },
                {
                    id:2,
                    message:'Yeah what is that?',
                    username:'Ginny'
                },
                {
                    id:3,
                    message:'I am prego!',
                    username:'Hermione'
                },
                {
                    id:4,
                    message:'WHAAAAATTTT REEEALLLLY?!?',
                    username:'Ginny'
                }
        ]
        }
    }

    componentDidMount(){
        this.current()
    }

    current = async() => {
        const {id} = this.props.user;
        if(!id){
            console.log('current entered')
            try{
                const user = await axios.post('/api/user/current');
                this.props.updateUser(user.data)
            } catch(err){
                this.props.history.push('/')
            }
        } 
    }

    updateState=(value)=>{
        this.setState({
            messageType:value
        })
    }



    render(){
        return(
            <Dash>
                <Nav updateState={this.updateState}/>
                <Message messageType={this.state.messageType}/>
                <Chat />
                <Profile/>
            </Dash>
        )
    }
}

function mapStateToProps(reduxState){

    return{
        chats:reduxState.chats,
        user:reduxState.user,
        
    }
}

export default connect(mapStateToProps,{updateChats,updateUser})(Dashboard)



//////////////////////////////////////////////STYLING COMPONENTS BELOW///////////////////////////////////////////

const Dash = styled.div`
    display:flex;
    width:100%;
    background:#5d697f;
    justify-content:center;
`