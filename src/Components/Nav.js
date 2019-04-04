import React, {Component} from 'react';
import List from './List';
import Friends from './Friends';
import Group from './Group';
import Individual from './Individual';
import styled from 'styled-components'

const icons = {fontSize:'65px',color:'lightgrey'}
const NavBody = styled.div`
    margin-left:1vw;
    width:10vw;
    background:#303841;
    height:97vh;
    display:flex;
    flex-direction:column;
    margin-top:1.5vh;
    border-radius:10px 0px 0px 10px;
    margin-bottom:1.5vh
`
const NavTop = styled.div`
    height:25%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
`

const ActiveDot = styled.div`
    display:flex;
    margin-top:10px;
    margin-left:-55px;
`



class Nav extends Component {
    render(){
        console.log(this.props.updateState)
        const {updateState} = this.props;
        return(
            <NavBody>
                <NavTop>
                    <ActiveDot id="active-dot">
                        <div className="active-dot" id="red-dot"></div>
                        <div className="active-dot" id="yellow-dot"></div>
                        <div className="active-dot" id="green-dot"></div>
                    </ActiveDot>
                    <img src='https://s3-us-west-1.amazonaws.com/marketin/Hermoine.jpeg' alt='profile' style={{height:'60%',width:'75%',borderRadius:'50%',background:'gold',position:'relative',filter:'grayscale(100%)'}}/>
                    <div style={{height:15,width:15,background:'green',borderRadius:'50%',boxShadow:'-1px -1px 3px 2px black',position:'absolute',top:'150px',left:'120px'}}></div>
                </NavTop>

                <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',height:'60%',alignItems:'center'}}>
                    <i onClick={()=>updateState(List)} className="fas fa-comment" style={icons} id="nav-chat-icon"></i>
                    <i onClick={()=>updateState(Friends)} className="fas fa-address-book" style={icons} id="nav-icons"></i>
                    <i onClick={()=>updateState(Individual)} className="fas fa-user" style={icons} id="nav-individual-icon"></i>
                    <i onClick={()=>updateState(Group)} className="fas fa-users" style={icons} id="nav-group-icon"></i>
                </div>
                <div style={{display:'flex',alignItems:'center',height:'15%',justifyContent:'center'}}>
                    <i className="fas fa-power-off" style={icons}></i>
                </div>
            </NavBody>
        )
    }

}


export default Nav