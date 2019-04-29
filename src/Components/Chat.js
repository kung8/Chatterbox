import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import socket from './Sockets'
import { updateChat } from '../ducks/reducer';
import axios from 'axios'

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        socket.on('startChat', chat => {
            this.props.updateChat(chat)
        })
        socket.on('sendMsg', messages => {
            console.log(messages)
            this.props.updateChat(messages)
            this.setState({
                message: ''
            })
        })
    }

    send(){
        const { message } = this.state;
        const { room } = this.props;
        const { id } = this.props.user
        socket.emit('startChat',{room})
        socket.emit('sendMsg', { message, room, id })
    }

    render() {
        const mappedChat = this.props.chat.map(message => {
            let color;
            let position;
            if (message.user_id === this.props.user.id) {
                color = "#26f7ff75";
                position = "flex-end";
                return (
                    <div key={message.id} style={{ width: "98%", display: "flex", justifyContent: `${position}`, marginRight: "5px" }}>
                        <div style={{ background: `${color}`, display: "flex", marginTop: "5px", maxWidth: "60%", justifyContent: "flex-end", borderRadius: "10px", padding: "4px" }}>
                            <div style={{ display: "flex"}}>
                                <p style={{ margin: 0, padding: 0, textAlign: "left", marginLeft: "2px" }}>{message.message}</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", height: "100%" }}>
                                <img src={message.pic} style={{ height: "2rem", width: "2rem", borderRadius: "50%", marginLeft:'5px' }} />
                            </div>
                        </div>
                    </div>
                )
            } else {
                color = "lightgreen";
                position = "flex-start";
                return (
                    <div key={message.id} style={{ width: "98%", display: "flex", justifyContent: `${position}`, marginLeft: "5px" }} >
                        <div style={{ background: `${color}`, display: "flex",marginTop: "5px", maxWidth: "60%", justifyContent: "flex-start", borderRadius: "10px", padding: "4px" }}>
                            <div style={{ display: "flex", textAlign: "left", padding: "2px" }}>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%" }}>
                                    <img src={message.pic} style={{ height: "2rem", width: "2rem", borderRadius: "50%" , marginRight:'5px' }} />
                                </div>
                                <p style={{ margin: 0, padding: 0, textAlign: "left", marginLeft: "2px" }}>
                                    {message.message}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
        })

        return (
            <ChatBody>
                <ChatHeading>
                    <NameDot>
                        <Name>{this.props.friend.first} {this.props.friend.last}</Name>
                        <Dot></Dot>
                    </NameDot>
                    <IconHolder>
                        <Icons className="fas fa-folder"></Icons>
                        <Icons className="fas fa-phone"></Icons>
                        <Icons className="fas fa-video"></Icons>
                    </IconHolder>
                </ChatHeading>

                <Chats>
                    {mappedChat}
                </Chats>

                <FormHolder>
                    <Form>
                        <Textarea onChange={(e) => this.setState({ message: e.target.value })} placeholder='Send Message...' value={this.state.message} />
                        <ButtonsHolder>
                            <TopButtons>
                                <Buttons>
                                    <Icons className="fas fa-images"></Icons>
                                </Buttons>
                                <Buttons>
                                    <Icons className="far fa-smile-wink"></Icons>
                                </Buttons>
                            </TopButtons>
                            <Send onClick={() => this.send()}>
                                <Icons className="far fa-paper-plane"></Icons>
                            </Send>
                        </ButtonsHolder>
                    </Form>
                </FormHolder>
            </ChatBody>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        friend: reduxState.friend,
        chat: reduxState.chat,
        room: reduxState.room,
        user: reduxState.user
    }
}

export default connect(mapStateToProps, { updateChat })(Chat)


//////////////////////////////////////////////STYLING COMPONENTS BELOW///////////////////////////////////////////

const ChatBody = styled.div`
    width:45vw;
    height:97vh;
    display:flex;
    flex-direction:column;
    margin-top:1.5vh;
    margin-bottom:1.5vh;
    @media screen and (max-width:1370px){
        min-width:700px;
        border-radius:0 10px 10px 0;
    }

    @media screen and (max-width:1025px){
        min-width:97vw;
        max-width:97vw;
        height:97vh;
    }

    @media screen and (max-width:415px){
        min-width:97vw;
        max-width:97vw;
        height:97vh;
    }

    @media screen and (max-width:376px){
        min-width:97vw;
        max-width:97vw;
        height:97vh;
    }
    
`
const ChatHeading = styled.div`
    display:flex;
    align-items:center;
    background:lightgrey;
    height:10%;
    border-bottom:darkgrey solid 0.05px;
    width:100%;
    justify-content:space-between;
    @media screen and (max-width:1370px){
        border-radius:0 10px 0 0;
    }
    @media screen and (max-width:1025px){
        border-radius:10px 10px 0 0;
        width:100%;
    }
`

const NameDot = styled.div`
    display:flex;
    align-items:center;
`
const Dot = styled.div`
    margin-left:10px;
    margin-right:10px;
    height:10px;
    width:10px;
    background:red;
    border-radius:50%;
`
const IconHolder = styled.div`
    display:flex;
    width:30%;
    height:98%;
    align-items:center;
    justify-content:space-evenly;
`

const Icons = styled.i`
    font-size:25px;
    color:#363E47
`

const Chats = styled.div`
    display:flex;
    background:lightgrey;
    height:75%;
    max-height:75%;
    width:100%;
    flex-direction:column;
    overflow-y:scroll;
    ::-webkit-scrollbar {
        width:0px
    }
`

const FormHolder = styled.div`
    display:flex;
    align-items:center;
    height:15%;
    width:100%
`
const Form = styled.form`
    display:flex;
    width:100%;
    height:100%
`

const Textarea = styled.textarea`
    max-width:75%;
    min-width:75%;
    min-height:97%;
    max-height:97%;
    font-size:20px;
    @media screen and (max-width:1025px){
        border-radius:0 0 0 10px;
    }
`

const ButtonsHolder = styled.div`
    display:flex;
    flex-direction:column;
    width:25%;
`

const TopButtons = styled.div`
    width:100%;
    height:50%;
`

const Buttons = styled.button`
    height:100%;
    width:50%;
    background:white;
    border: solid lightgrey 1px;
`
const Send = styled.button`
    height:50%;
    background:forestgreen;
    outline-color:lightgreen;
    @media screen and (max-width:1370px){
        border-radius:0 0 10px 0;

    }
`

const Name = styled.h1`
    font-size:40px;
    margin-left:5px;
    @media screen and (max-width:769px){
        font-size:35px;
    }
    @media screen and (max-width:600px){
        font-size:30px;
    }
    @media screen and (max-width:500px){
        font-size:25px;
    }
    @media screen and (max-width:376px){
        font-size:20px;
    } 
`