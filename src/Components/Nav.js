import React, {Component} from 'react';
import List from './List';
import Friends from './Friends';
import Group from './Group';
import Individual from './Individual';
import styled from 'styled-components'

const NavBody = styled.div`
    margin-left:1vw;
    // width:10vw;
    min-width:150px;
    max-width:150px;
    background:#303841;
    height:97vh;
    display:flex;
    flex-direction:column;
    margin-top:1.5vh;
    border-radius:10px 0px 0px 10px;
    margin-bottom:1.5vh;    
    @media screen and (max-width:1000px){
        display:none;
    }
`
const NavTop = styled.div`
    height:25%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
`

const ActiveDots = styled.div`
    display:flex;
    margin-top:10px;
    margin-left:-55px;
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
    // justify-content:space-evenly;
    height:60%;
    align-items:center;
`

const IndIconHolder = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
    height:25%
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
    justify-content:center;
    align-items:center;
    height:65%;
    &:hover {
        background:white;
    }
`

const ProfilePic = styled.img`
    height:90%;
    width:75%;
    border-radius:50%;
    background:gold;
    position:relative;
    filter:grayscale(100%);    
`

const Active = styled.div`
    height:15px;
    width:15px;
    background:green;
    border-radius:50%;
    box-shadow:-1px -1px 3px 2px black;
    position:absolute;
    top:145px;
    left:115px;
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

class Nav extends Component {
    render(){
        console.log(this.props.updateState)
        const {updateState} = this.props;
        return(
            <NavBody>
                <NavTop>
                    <ActiveDots>
                        <Dot id="red-dot"></Dot>
                        <Dot id="yellow-dot"></Dot>
                        <Dot id="green-dot"></Dot>
                    </ActiveDots>
                    <PicHolder>
                        <ProfilePic src='https://s3-us-west-1.amazonaws.com/marketin/Hermoine.jpeg' alt='profile'/>
                        {/* <Active></Active> */}
                    </PicHolder>
                </NavTop>

                <IconHolder>
                    <IndIconHolder>
                        <Icons onClick={()=>updateState(List)} className="fas fa-comment"></Icons>
                    </IndIconHolder>
                    <IndIconHolder>
                        <Icons onClick={()=>updateState(Friends)} className="fas fa-address-book" ></Icons>
                    </IndIconHolder>
                    <IndIconHolder>
                        <Icons onClick={()=>updateState(Individual)} className="fas fa-user"></Icons>
                    </IndIconHolder>
                    <IndIconHolder>
                        <Icons onClick={()=>updateState(Group)} className="fas fa-users"></Icons>
                    </IndIconHolder>
                </IconHolder>
                <Logout>
                    <Icons className="fas fa-power-off"></Icons>
                </Logout>
            </NavBody>
        )
    }

}


export default Nav