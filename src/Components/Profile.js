import React, {Component} from 'react';

class Profile extends Component {
    render(){
        return(
            <div style={{width:'20vw',background:'yellow',height:'97vh',display:'flex',flexDirection:'column',justifyContent:'space-evenly',marginRight:'1vw',marginTop:'1.5vh',borderRadius:'0 10px 10px 0',marginBottom:'1.5vh'}}>
                <img src='https://s3-us-west-1.amazonaws.com/marketin/Ginny.jpeg' alt='Individual or Group Pic' style={{height:'150px',width:'150px',borderRadius:'50%'}}/>
                <p>Ginny Weasley</p>
                <p>Email</p>
                <p>Location</p>
                <p>Phone</p>
                <p>Social Media</p>
            </div>
            )
    }
}

export default Profile