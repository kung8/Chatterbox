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
        const {last,first,email,pic} = this.props.friend
        return(
            <ProfileBody>
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
        friend:reduxState.friend
    }
}

export default connect(mapStateToProps)(Profile)


//////////////////////////////////////////////STYLING COMPONENTS BELOW///////////////////////////////////////////

const ProfileBody = styled.div`
    width:20vw;
    background:#F2F7F7;
    height:97vh;
    display:flex;
    flex-direction:column;
    margin-right:1vw;
    margin-top:1.5vh;
    border-radius:0 10px 10px 0;
    margin-bottom:1.5vh;
    align-items:center;
    @media screen and (max-width:1370px){
        display:none;
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