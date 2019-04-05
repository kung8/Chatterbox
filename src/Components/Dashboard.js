import React, {Component} from 'react';
import Nav from './Nav';
import Message from './Message';
import Chat from './Chat';
import Profile from './Profile';
import List from './List';
import styled from 'styled-components';

class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            messageType:List
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
                <Chat/>
                <Profile/>
            </Dash>
        )
    }
}


export default Dashboard



//////////////////////////////////////////////STYLING COMPONENTS BELOW///////////////////////////////////////////

const Dash = styled.div`
    display:flex;
    width:100%;
    background:#5d697f;
    justify-content:center;
`