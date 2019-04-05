import React, {Component} from 'react';
import styled from 'styled-components';

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

class Profile extends Component {
    render(){
        return(
            <ProfileBody>
                <ImageHolder>
                    <Image 
                        src='https://s3-us-west-1.amazonaws.com/marketin/Ginny.jpeg' 
                        alt='InImageHolderidual or Group Pic'
                        />
                </ImageHolder>
                <PersonalHolder>
                    <h1>Ginny Weasley</h1>
                    {/* the name needs to shrink when the name is very long to keep it on one line or break it on first and last name or when the window gets smaller.  */}
                    <p>Email</p>
                    <p>Location</p>
                    <p>Phone</p>
                    <p>Social Media</p>
                </PersonalHolder>
            </ProfileBody>
            )
    }
}

export default Profile