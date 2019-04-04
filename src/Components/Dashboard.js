import React, {Component} from 'react';
import Nav from './Nav';
import Message from './Message';
import Chat from './Chat';
import Profile from './Profile';
import List from './List';

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
            <div style={{display:'flex',maxWidth:'100vw',background:'#5d697f'}}>
                <Nav updateState={this.updateState}/>
                <Message messageType={this.state.messageType}/>
                <Chat/>
                <Profile/>
            </div>
        )
    }
}


export default Dashboard