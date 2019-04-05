import React, {Component} from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
    height:65%;
    width:15%;
    border-radius:50%;
    background:#303841;
    border:#303841
`

const Conditional = styled.div`
    height:90%;
`

class Message extends Component {
    render(){
        const ConditionalComponent = this.props.messageType
        return(
            <MessageBody>
                <FormHolder>
                    <Form>
                        <i className="fas fa-search" style={{fontSize:'25px',color:'lightgrey',marginLeft:'5px',marginRight:'0.5rem'}}></i>
                        <input placeholder='Search' id="search-input" style={{fontSize:'25px',background:'#303841',color:'lightgrey',height:'65%',width:'78%',border:'transparent'}}/>
                    </Form>
                    
                    <Button id="new-chat" style={{}}>
                        <i style={{fontSize:'25px',color:'lightgrey'}} className="fas fa-plus"></i>
                    </Button>
                </FormHolder>
                <Conditional>
                    <ConditionalComponent/>    
                </Conditional>
                {/* <div style={{height:10,width:10,background:'red',borderRadius:'50%',boxShadow:'-1px -1px 3px 1px black'}}></div> */}
            </MessageBody>
        )
    }
}

export default Message