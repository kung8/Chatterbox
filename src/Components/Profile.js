import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

class Profile extends Component {
    constructor(){
        super();
        this.state={

        }
    }
    
    render(){
        const {last,first,email,pic} = this.props.selectedIndProfile
        return(
            <ProfileBody style={{borderRadius:'10px',position:'relative', display:this.props.isProfileOpened?'flex':'none',zIndex:this.props.isProfileOpened&&4}}>
                    <ChevronLeft className="fas fa-chevron-left" onClick={()=>this.props.handleProfileToggle()}/>
                    <h1 style={{fontSize:35}}>PROFILE</h1>
                <ImageHolder>
                    <Image 
                        src={pic} 
                        alt='friend pic'
                        />
                </ImageHolder>
                <PersonalHolder>
                    <p>{first} {last}</p>
                    {/* the name needs to shrink when the name is very long to keep it on one line or break it on first and last name or when the window gets smaller.  */}
                    <p>{email}</p>
                    {/* <p>Location</p>
                    <p>Phone</p>
                    <p>Social Media</p> */}
                </PersonalHolder>
            </ProfileBody>
            )
    }
}

function mapStateToProps(reduxState){
    return{
        selectedIndProfile:reduxState.selectedIndProfile,
        selectedGroupProfile:reduxState.selectedGroupProfile
    }
}

export default connect(mapStateToProps)(Profile)


//////////////////////////////////////////////STYLING COMPONENTS BELOW///////////////////////////////////////////
// const sw = 'background:#F2F7F7;'
const ProfileBody = styled.div`
    width:25vw;
    background:#F2F7F7;
    height:97vh;
    display:flex;
    flex-direction:column;
    margin-left:0.5vw;
    margin-right:0.5vw;
    margin-top:1.5vh;
    min-width:315px;
    border-radius:0 10px 10px 0;
    margin-bottom:1.5vh;
    align-items:center;
    @media screen and (min-width:300px) and (max-width:1024px){
        width:97vw
    }
`
const ChevronLeft = styled.i `
    font-size:45px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    top:70px;
    left:-145px;
    height:50px;
    width:50px;
    &:hover{
        color:lightgrey;
    }
`

const ImageHolder = styled.div`
    height:30%;
    width:100%;
    display:flex;
    align-items:flex-end;
    justify-content:center;
`

const Image = styled.img`
    height:150px;
    width:150px;
    border-radius:50%;
`

const PersonalHolder = styled.div`
    height:70%;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    flex-wrap:wrap;
`