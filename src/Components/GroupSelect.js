import React, {Component} from 'react'
import styled from 'styled-components';

class GroupSelect extends Component {
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div style={{display:'flex', alignItems:'center',background:'lightblue',borderRadius:'10px',width:'98%',marginLeft:'1%',position:'relative'}}>
                <img style={{height:'50px',width:'50px',borderRadius:'50%',marginLeft:'10px',marginRight:'10px'}} alt='pic'/>
                <h3 >Group 1</h3>
                <Button onClick={()=>this.props.handleIsGroupSelected()} style={{position:'absolute',right:'5px'}}>
                    <Plus className="fas fa-plus"/>
                </Button>
            </div>
        )
    }
}

export default GroupSelect

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