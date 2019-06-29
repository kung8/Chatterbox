import React, { Component } from 'react'
import styled from 'styled-components';
import socket from './Sockets'
import {connect} from 'react-redux';
import {selectGroup} from '../ducks/reducer'

class IndGroup extends Component {
    async startGroupChat(group){
        await this.props.selectGroup(group)
        console.log(this.props.selectedGroup)
        
    }
    
    render() {
        const {group} = this.props
        return (
            <div style={{ display: 'flex', alignItems: 'center', background: 'orange', borderRadius: '10px', width: '98%', marginLeft: '1%', position: 'relative', height: 50,justifyContent:'space-between'}}>
                <h3 style={{ marginLeft: 10 }}>{group.group_name}</h3>
                <div style={{ display: 'flex',height:'75%',width:'30%',justifyContent:'space-between',marginRight:10,alignItems:'center'}}>
                    <Button onClick={()=>this.startGroupChat(group)}>
                        <Icons className="fas fa-comment"/>
                    </Button>
                    <Button style={{background:'red'}}>
                        <Icons className="fas fa-pencil-alt"/>
                    </Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps (reduxState) {
    return{
        selectedGroup:reduxState.selectedGroup
    }
}

export default connect(mapStateToProps,{selectGroup})(IndGroup)

const Button = styled.button`
    height:90%;
    width:45%;
    border-radius:50%;
    background: green;
    border:#303841 solid 1px;
    &:focus {
        box-shadow: 0 0 1px 1px darkgrey;
        outline: none;
    }
`

const Icons = styled.i`
    font-size:25px;
    color:lightgrey;
`