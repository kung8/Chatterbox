import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { throws } from 'assert';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditClicked: false,
            pic: props.user.pic,
            email: props.user.email,
            username: props.user.username,
            first: props.user.first,
            last: props.user.last
        }
    }

    handleInput = (e) => {
        const { value, name } = e.target
        this.setState({
            [name]: value
        })
    }

    handleEditToggle = () => {
        this.setState({
            isEditClicked: true
        })
    }

    handleCancel(){
        const {pic,email,username,first,last} = this.props.user
        this.setState({
            isEditClicked: false,
            pic,
            email,
            username,
            first,
            last
        })
    }

    handleEditInputs() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column',width:'90%'}}>
                <input style={{fontSize:25,marginTop:5}} type="text" name='pic' placeholder='pic' value={this.state.pic} onChange={this.handleInput} />
                {/* <div> */}
                    <input style={{fontSize:25,marginTop:5}} type="text" name='first' placeholder='first name' value={this.state.first} onChange={this.handleInput} />
                    <input style={{fontSize:25,marginTop:5}} type="text" name='last' placeholder='last name' value={this.state.last} onChange={this.handleInput}/>
                {/* </div> */}
                <input style={{fontSize:25,marginTop:5}} type="text" name='username' placeholder='username' value={this.state.username} onChange={this.handleInput} />
                <input style={{fontSize:25,marginTop:5}} type="text" name='email' placeholder='email' value={this.state.email} onChange={this.handleInput} />
                <div style={{display:'flex',justifyContent:'space-evenly',marginTop:5}}>
                    <button style={{background:'red',width:120, fontWeight:800,height:45, borderRadius:10, fontSize:25,color:'white',border:'black solid 1px'}} onClick={() => this.handleCancel()}>CANCEL</button>
                    <button style={{background:'green',fontWeight:800,width:100, height:45, borderRadius:10, fontSize:25,color:'white',border:'black solid 1px'}}>SAVE</button>
                </div>
            </div>
        )
    }

    saveProfileEdit = () => {
        //axios call for saving what is being edited
        //might need to look into s3 upload for the image
    }

    handleProfileClose=()=>{
        this.props.handleProfileCloseFromOwnProfile()
        this.setState({
            isEditClicked:false
        })
    }

    render() {
        console.log(this.state)
        // console.log(this.props.selectedIndProfile,this.props.user)
        const { selectedIndProfile, user } = this.props
        const { last, first, email, pic, username } = this.props.selectedIndProfile
        return (
            <ProfileBody style={{ borderRadius: '10px', position: 'relative', display: this.props.isProfileOpened ? 'flex' : 'none', zIndex: this.props.isProfileOpened && 4 }}>
                <ChevronLeft className="fas fa-chevron-left" onClick={() => selectedIndProfile.id === user.id ?  this.handleProfileClose(): this.props.handleProfileToggle()} />
                <h1 style={{ fontSize: 35 }}>PROFILE</h1>
                <ImageHolder>
                    <Image
                        src={pic}
                        alt='friend pic'
                    />
                </ImageHolder>
                <PersonalHolder>
                    {this.state.isEditClicked && selectedIndProfile.id === user.id?
                        this.handleEditInputs()
                        :
                        <div style={{marginTop:5}}>
                            <p>{first} {last}</p>
                            <p>{username}</p>
                            {/* the name needs to shrink when the name is very long to keep it on one line or break it on first and last name or when the window gets smaller.  */}
                            <p>{email}</p>
                        </div>
                    }
                    {/* <p>Location</p>
                    <p>Phone</p>
                    <p>Social Media</p> */}
                    {!this.state.isEditClicked && (selectedIndProfile.id === user.id && <button style={{fontWeight:800,background:'green',width:100, height:45, borderRadius:10, fontSize:25,marginTop:5,color:'white',border:'black solid 1px'}} onClick={this.handleEditToggle}>EDIT</button>)}
                </PersonalHolder>
            </ProfileBody>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        selectedIndProfile: reduxState.selectedIndProfile,
        selectedGroupProfile: reduxState.selectedGroupProfile,
        user: reduxState.user
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
const ChevronLeft = styled.i`
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