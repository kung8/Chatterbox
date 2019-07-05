import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import socket from './Sockets'
import { updateChat } from '../ducks/reducer';

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
            this.props.updateChat(messages)
            this.setState({
                message: ''
            })
        })
    }

    send=(e)=>{
        e.preventDefault()
        const { message } = this.state;
        if(message !== ''){
            const { room } = this.props;
            const { id } = this.props.user
            socket.emit('startChat',{room})
            socket.emit('sendMsg', { message, room, id })
        }
    }


    handleChatToggle(){
        const {room} = this.props
        socket.emit('endChat',{room})
        this.props.handleChatToggle()
    }

    render() {
        let mappedChat
        if(this.props.chat.length){
            mappedChat = this.props.chat.map(message => {
                let color;
                let position;
                if (message.user_id === this.props.user.id) {
                    color = "#26f7ff75";
                    position = "flex-end";
                    return (
                        <Message key={message.id} style={{ justifyContent: `${position}`,marginRight: 5,marginBottom:5}}>
                            <div style={{ background: `${color}`, display: "flex", marginTop: "5px", maxWidth: "60%", justifyContent: "flex-end", borderRadius: "10px", padding: "4px" ,minHeight:40}}>
                                {/* <div style={{ display: "flex"}}> */}
                                    <p style={{ margin: 0, padding: 0, textAlign: "left", marginLeft: "2px"}}>{message.message}</p>
                                {/* </div> */}
                                {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", height: "100%" }}> */}
                                    <img src={message.pic} style={{ height: "2rem", width: "2rem", borderRadius: "50%", marginLeft:'5px' }} alt=''/>
                                {/* </div> */}
                            </div>
                        </Message>
                    )
                } else {
                    color = "lightgreen";
                    position = "flex-start";
                    return (
                        <Message key={message.id} style={{justifyContent: `${position}`, marginLeft:5 ,marginBottom:5}} >
                            <div style={{ background: `${color}`, display: "flex",marginTop: "5px", maxWidth: "60%", justifyContent: "flex-start", borderRadius: "10px", padding: "4px",minHeight:40 }}>
                                {/* <div style={{ display: "flex", textAlign: "left", padding: "2px" }}> */}
                                    {/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%" }}> */}
                                        <img src={message.pic} style={{ height: "2rem", width: "2rem", borderRadius: "50%" , marginRight:'5px' }} alt='' />
                                    {/* </div> */}
                                    {/* <div style={{display:'flex'}}> */}
                                        <p style={{ margin: 0, padding: 0, textAlign: "left", marginLeft: "2px" }}>
                                            {message.message}
                                        </p>
                                    {/* </div> */}
                                {/* </div> */}
                            </div>
                        </Message>
                    );
                }
            })
        } 

        return (
            <ChatBody style={{position:'relative',left:this.props.isChatClicked&&0, left:this.props.isProfileOpened&&'12.5vw',display:this.props.isChatClicked?'flex':'none'}}>
                <ChatHeading>
                    <NameDot>
                        <ChevronLeft className="fas fa-chevron-left" onClick={()=>this.handleChatToggle()}/>
                        <Name onClick={this.props.handleProfileToggle}>{this.props.friend.first} {this.props.friend.last}</Name>
                        <Dot></Dot>
                    </NameDot>
                    {/* <IconHolder>
                        <Icons className="fas fa-folder"></Icons>
                        <Icons className="fas fa-phone"></Icons>
                        <Icons className="fas fa-video"></Icons>
                    </IconHolder> */}
                </ChatHeading>

                <Chats>
                    {mappedChat?mappedChat:<h3 style={{textAlign:'center',fontWeight:'bold',marginTop:40}}>Start Chat Now</h3>}
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
                            <Send onClick={this.send}>
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
    width:25vw;
    min-width:315px;
    height:97vh;
    max-height:97vh;
    display:none;
    flex-direction:column;
    margin-left:0.5vw;
    margin-right:0.5vw;
    margin-top:1.5vh;
    margin-bottom:1.5vh;
    border-radius:10px;
    @media screen and (min-width:300px) and (max-width:1024px){
        width:97vw
    }
`

const ChevronLeft = styled.i `
    font-size:45px;
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    height:50px;
    width:50px;
    &:hover{
        color:white;
    }
`

const ChatHeading = styled.div`
    display:flex;
    align-items:center;
    background:lightgrey;
    height:10%;
    border-radius:10px 10px 0 0;
    border-bottom:darkgrey solid 0.05px;
    width:100%;
    justify-content:space-between;
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
    max-height:75vh;
    width:100%;
    flex-direction:column;
    overflow-y:auto;
    ::-webkit-scrollbar {
        width:0px
    }
`

const Message = styled.div`
    width: 98%;
    display: flex; 
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
    border-radius:0 0 0 10px;
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
    border-radius:0 0 10px 0;
`

const Name = styled.h1`
    font-size:30px;
    margin-left:5px;
    @media screen and (min-width:300px) and (max-width:700px){
        font-size:20px
    }
`