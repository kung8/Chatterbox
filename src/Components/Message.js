import React, {Component} from 'react';
import styled from 'styled-components';

class Message extends Component {
    
    render(){
        const ConditionalComponent = this.props.messageType
        return(
            <MessageBody>
                <FormHolder>
                    <Form>
                        <Input placeholder='Search' id="search-input"/>
                        <Search className="fas fa-search"/>
                    </Form>
                    
                    <Button>
                        <Plus className="fas fa-plus"/>
                    </Button>
                </FormHolder>
                <Conditional>
                    <ConditionalComponent setSocketListeners={this.props.setSocketListeners}/>    
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
    @media screen and (max-width:1300px){
        display:none;
    }
`

const FormHolder = styled.div`
    height:10%;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    border-bottom:lightgrey solid 0.02px;
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