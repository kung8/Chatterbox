import React, {Component} from 'react';
import styled from 'styled-components';

class GroupAddList extends Component {
    constructor(){
        super()
        this.state={
            isUserSelected:false,
            group:[]
        }
    }

    async handleAddUserToGroup(user){
        await this.setState({isUserSelected:!this.state.isUserSelected})
        this.props.handleAddUserToGroup(user,this.state.isUserSelected) 
    }

    render(){
        const {user} = this.props
        return(
            <div style={{display:'flex', alignItems:'center',background:'lightblue',borderRadius:'10px',width:'98%',marginLeft:'1%',position:'relative'}}>
                <img src={user.pic} style={{height:'50px',width:'50px',borderRadius:'50%',marginLeft:'10px',marginRight:'10px'}} alt='pic'/>
                <h3 >{user.first} {user.last}</h3>
                <Button onClick={()=>this.handleAddUserToGroup(user)} style={{position:'absolute',right:'5px',background:this.state.isUserSelected?'green':'red',boxShadow:'0 0 1px 1px black'}}>
                    {this.state.isUserSelected?<i style={{color:'white',fontSize:'25px'}} className="fas fa-check"/>:<Plus className="fas fa-plus"/>}
                </Button>
        </div>
        )
    }
}

export default GroupAddList 

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