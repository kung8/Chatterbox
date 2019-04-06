import React, {Component} from 'react';
import Nav from './Nav';
import Message from './Message';
import Chat from './Chat';
import Profile from './Profile';
import List from './List';
import styled from 'styled-components';
import io from 'socket.io-client';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUsers} from './../ducks/reducer';

class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            messageType:List,
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
        this.getUsers()
    }

    getUsers=async()=>{
        const users = await axios.get('/api/users');
        console.log(users.data);
        this.props.updateUsers(users.data)
        // this.setState({
        //     users:users.data
        // })
    }

    updateState=(value)=>{
        this.setState({
            messageType:value
        })
    }



    render(){
        console.log(this.props)
        return(
            <Dash>
                <Nav updateState={this.updateState}/>
                <Message setSocketListeners={this.setSocketListeners} messageType={this.state.messageType}/>
                <Chat messages={this.state.messages} />
                <Profile/>
            </Dash>
        )
    }
}

function mapStateToProps(reduxState){

    return{
        users:reduxState.users
    }
}

export default connect(mapStateToProps,{updateUsers})(Dashboard)



//////////////////////////////////////////////STYLING COMPONENTS BELOW///////////////////////////////////////////

const Dash = styled.div`
    display:flex;
    width:100%;
    background:#5d697f;
    justify-content:center;
`