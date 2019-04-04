import React, {Component} from 'react';

class Profile extends Component {
    render(){
        return(
            <div style={{width:'20vw',background:'#F2F7F7',height:'97vh',display:'flex',flexDirection:'column',marginRight:'1vw',marginTop:'1.5vh',borderRadius:'0 10px 10px 0', marginBottom:'1.5vh',alignItems:'center'}}>
                <div style={{height:'30%',width:'100%',display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
                    <img src='https://s3-us-west-1.amazonaws.com/marketin/Ginny.jpeg' alt='Individual or Group Pic' style={{height:'150px',width:'150px',borderRadius:'50%'}}/>
                </div>
                <div style={{height:'70%',width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <h1>Ginny Weasley</h1>
                    {/* the name needs to shrink when the name is very long to keep it on one line or break it on first and last name or when the window gets smaller.  */}
                    <p>Email</p>
                    <p>Location</p>
                    <p>Phone</p>
                    <p>Social Media</p>
                </div>
            </div>
            )
    }
}

export default Profile