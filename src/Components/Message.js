import React, {Component} from 'react';
import styled from 'styled-components';

class Message extends Component {
    constructor(){
        super()
        this.state={
            search:''
        }
    }

    search(value){
        this.setState({
            search:value
        })
    }

    render(){
        const ConditionalComponent = this.props.messageType
        return(
            <MessageBody style={{borderRadius:'10px',position:'relative',left:this.props.isHamburgerOpened&&'-75px',display:this.props.isChatClicked&&'none', display:this.props.isProfileOpened&&'none', display:!this.props.isMessageOpened&&'none'}}>
                <FormHolder>
                    <Hamburger className="fas fa-bars" onClick={()=>this.props.handleHamburgerToggle()}/>
                    <Form>
                        <Input placeholder='Search' id="search-input" onChange={e=>this.search(e.target.value)}/>
                        <Search className="fas fa-search"/>
                    </Form>
                    

                </FormHolder>
                <Conditional>
                    <ConditionalComponent 
                        search={this.state.search} 
                        handleChatToggle={this.props.handleChatToggle} 
                        isChatClicked={this.props.isChatClicked} 
                        handleHamburgerToggle={this.props.handleHamburgerToggle} 
                        hamburgerToggleChatOnly={this.props.hamburgerToggleChatOnly}/>    
                </Conditional>
            </MessageBody>
        )
    }
}

export default Message

//////////////////////////////////////////////STYLING COMPONENTS BELOW///////////////////////////////////////////

const MessageBody = styled.div`
    width:25vw;
    background:#363E47;
    height:97vh;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    margin-top:1.5vh;
    margin-bottom:1.5vh;
    margin-left:0.5vw;
    margin-right:0.5vw;
    min-width:315px;
    @media screen and (min-width:300px) and (max-width:1024px){
        min-width:97vw;
        max-width:97vw
    }
`

const FormHolder = styled.div`
    height:10%;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    border-bottom:lightgrey solid 0.02px;
`

const Hamburger = styled.i`
    color:lightgrey;
    font-size:35px;
    &:hover{
        color:white;
    }
`

const Form = styled.form`
    background:#303841;
    width:65%;
    height:65%;
    border-radius:16px;
    display:flex;
    align-items:center;
`

const Search = styled.div`
    font-size:25px;
    color:lightgrey;
`

const Input = styled.input`
    font-size:25px;
    background:#303841;
    color:lightgrey;
    height:65%;
    width:78%;
    border:transparent;
    margin-left:10px;
    margin-right:0.5rem;
    &:focus {
        outline:none;
    }
    &::-webkit-input-placeholder {
        color: lightgray;
    }
`

const Conditional = styled.div`
    height:90%;
`