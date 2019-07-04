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
            <div style={{height:'50px',display:'flex', alignItems:'center',background:'lightblue',borderRadius:'10px',width:'98%',marginLeft:'1%',position:'relative'}}>
                {this.props.groupName?<Input onChange={(e)=>this.props.handleGroupNameCreation(e.target.value)} style={{marginLeft:10,height:40,borderRadius:'10px',background:'#363E47',fontSize:25,width:'75%',color:'white'}} placeholder='Create Group Name'/>
                :
                <h3 style={{marginLeft:10}}>Create New Group</h3>}
                {this.props.isGroupSelected?
                <Button onClick={this.props.createGroup} style={{position:'absolute',right:'5px',background:'green',boxShadow:'0 0 1px 1px black',height:'30px'}}>
                    {/* <i style={{fontSize:25,color:'white'}} className="fas fa-users"/> */}
                    <Plus className="fas fa-plus"/>                
                </Button>
                :
                <Button onClick={()=>this.props.handleIsGroupSelected()} style={{position:'absolute',right:'5px',background:'red',boxShadow:'0 0 1px 1px black',height:'30px'}}>
                    <Plus className="fas fa-plus"/>
                </Button>}
            </div>
        )
    }
}

export default GroupSelect

const Button = styled.button`
    // height:65%;
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

const Input = styled.input`
    &:focus {
        outline:none;
    }
    &::-webkit-input-placeholder {
        color: lightgray;
    }
`