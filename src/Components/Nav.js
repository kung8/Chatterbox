import React, { Component } from 'react';
import List from './List';
import Friends from './Friends';
import Group from './Group';
import Profile from './Profile'
import Individual from './Individual';
import styled from 'styled-components'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAll,updateUser } from '../ducks/reducer';

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            color: 'green'
        }
    }

    handleDot(value) {
        this.setState({
            color: value
        })
    }

    logout = async () => {
        await axios.post('/api/user/logout')
        this.props.clearAll()
        this.props.history.push('/')
    }

    render() {
        //Need to save availability to redux so that I can pass that to other users
        const { isHamburgerOpened } = this.props
        const { updateState, messageType } = this.props;

        return (
            <NavBody style={{display:`${isHamburgerOpened?'flex':'none'}`,left:`${this.props.isHamburgerOpened?'75px':'0px'}`,zIndex:`${this.props.isHamburgerOpened&&2}`,position:`${this.props.isHamburgerOpened&&'relative'}`}}>
                <NavTop>
                    <div style={{display:'flex',marginTop:'20px'}}>
                        <Hamburger 
                            className="fas fa-bars" 
                            onClick={()=>this.props.handleHamburgerToggle()} 
                            style={{marginLeft:'-65px'}}
                            />
                        <ActiveDots>
                            <Dot onClick={() => this.handleDot('red')} id="red-dot"></Dot>
                            <Dot onClick={() => this.handleDot('yellow')} id="yellow-dot"></Dot>
                            <Dot onClick={() => this.handleDot('green')} id="green-dot"></Dot>
                        </ActiveDots>
                    </div>
                    {/* <hr style={{width:'100%',marginTop:'18px'}}/> */}
                    <PicHolder>
                        <ProfilePic 
                            src={this.props.user.pic} 
                            alt='profile'
                            onClick={this.props.picHandle}
                            />
                        <Active style={{ background: this.state.color }}></Active>
                    </PicHolder>
                </NavTop>

                <IconHolder>
                    <IndIconHolder 
                        onClick={() => updateState(List,'List')} 
                        style={{ backgroundColor: messageType == List && 'white', borderRight: messageType == List && 'green solid 20px',width: messageType == List && '100%'}}>
                        <Icons 
                            className="fas fa-comment"></Icons>
                    </IndIconHolder>
                    
                    <IndIconHolder 
                        onClick={() => updateState(Individual,'Individual')} 
                        style={{ backgroundColor: messageType == Individual && 'white', borderRight: messageType == Individual && 'green solid 20px',width: messageType == Individual && '100%'}}>
                        <Icons className="fas fa-user"></Icons>
                    </IndIconHolder>
                    <IndIconHolder 
                        onClick={() => updateState(Group,'Group')} 
                        style={{ backgroundColor: messageType == Group && 'white', borderRight: messageType == Group && 'green solid 20px',width: messageType == Group && '100%' }}>
                        <Icons className="fas fa-users"></Icons>
                    </IndIconHolder>
                    <IndIconHolder 
                        onClick={() => updateState(Friends,'Friends')} 
                        style={{ backgroundColor: messageType == Friends && 'white',borderRight: messageType == Friends && 'green solid 20px',width: messageType == Friends && '100%' }}>
                        <Icons 
                            className="fas fa-address-book" ></Icons>
                    </IndIconHolder>
                </IconHolder>
                <Logout 
                    onClick={this.logout}>
                    <Icons className="fas fa-power-off"></Icons>
                </Logout>
            </NavBody>
        )
    }

}

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user
    }
}
export default withRouter(connect(mapStateToProps, { clearAll,updateUser })(Nav))



//////////////////////////////////////////////STYLING COMPONENTS BELOW///////////////////////////////////////////

const NavBody = styled.div`
    min-width:150px;
    max-width:150px;
    background:#303841;
    height:97vh;
    display:flex;
    flex-direction:column;
    margin-top:1.5vh;
    border-radius:10px 0px 0px 10px;
    margin-bottom:1.5vh;    
`
const NavTop = styled.div`
    height:25%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
`
const Hamburger = styled.i`
    color:lightgrey;
    position:absolute;
    left:85px;
    top:15px;
    font-size:35px;
    &:hover{
        color:white;
    };
    @media (min-height:812px){
        position:absolute;
        top:20px;
    };
    @media (min-height:1024px) and (max-height:1366px){
        position:absolute;
        top:30px;
    } 
    @media (min-height:1366px){
        position:absolute;
        top:45px;
    }

`

const ActiveDots = styled.div`
    display:flex;
    margin-right:-50px;
    margin-top:100px;
    &:hover > #red-dot {
        background:red;
        border:lightcoral solid 1px;
    };
    &:hover > #yellow-dot {
        background:yellow;
        border:#FFFFCC solid 1px;
    };
    &:hover > #green-dot {
        background:green;
        border:#00FF7F solid 1px;
    };
    @media (max-height:736px){
        margin-top:5px;
    } 
    @media (min-height:737px) and (max-height:760px){
        margin-top:10px;
    }
    @media (min-height:760px) and (max-height:800px){
        margin-top:5px;
    }
    @media (min-height:800px) and (max-height:824px){
        margin-top:10px;
    }
    @media (min-height:1024px) and (max-height:1366px){
        margin-top:20px;
    }
    @media (min-height:1366px){
        margin-top:35px
    }
      
`

const Dot = styled.div`
    background:#363E47;
    height:15px;
    width:15px;
    border-radius: 50%;    
    margin-left:5px;
    border:solid 1px #363E47;
    box-shadow: 0 0 1px 1px gray;
`

const IconHolder = styled.div`
    display:flex;
    flex-direction:column;
    height:60%;
    align-items:center;
`

const IndIconHolder = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
    height:25%;
    &:hover {
        background:white;
    }
`

const Icons = styled.i`
    font-size:65px;
    color:lightgrey;
`
const PicHolder = styled.div`
    display:flex;
    width:100%;
    margin-top:-8px;
    margin-left:15px;
    justify-content:center;
    align-items:center;
    position:relative;
    height:65%;
    &:hover {
        background:white;
        margin-left:0px;
        width:100%;
    }
`

const ProfilePic = styled.img`
    height:90%;
    width:75%;
    border-radius:50%;
    // background:gold;
    position:relative;
    filter:grayscale(100%);
    border: black solid 2px;    
`

const Active = styled.div`
    height:15px;
    width:15px;
    border-radius:50%;
    box-shadow:-1px -1px 3px 2px black;
    position:relative;
    top:25px;
    left:-15px;
    // @media screen and (max-width:2000px){
    //     left:-25px;
    //     top:45px;
    // }
`

const Logout = styled.div`
    display:flex;
    align-items:center;
    height:15%;
    justify-content:center;
    &:hover {
        background:white;
        border-radius:0 0 0 10px;
    }
`