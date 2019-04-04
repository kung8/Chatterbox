import React, {Component} from 'react';
import Nav from './Nav';
import Message from './Message';
import Chat from './Chat';
import Profile from './Profile';

class Dashboard extends Component {
    render(){
        return(
            <div style={{display:'flex',maxWidth:'100vw',background:'#5d697f'}}>
                <Nav/>
                <Message/>
                <Chat/>
                <Profile/>
            </div>
        )
    }
}


export default Dashboard