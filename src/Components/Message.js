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
                    <ConditionalComponent search={this.state.search} handleChatToggle={this.props.handleChatToggle} isChatClicked={this.props.isChatClicked} handleHamburgerToggle={this.props.handleHamburgerToggle} hamburgerToggleChatOnly={this.props.hamburgerToggleChatOnly}/>    
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
    min-width:320px;
    // @media screen and (max-width:1300px){
    //     width:40vw;
    //     border-radius:10px 0 0 10px
    // }
    // @media screen and (max-width:1025px){
    //     display:none;
    // }
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
    // @media screen and (min-width:1300px){
    //     display:none;
    // }
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

const Conditional = styled.div`
    height:90%;
`