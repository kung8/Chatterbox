import React, {Component} from 'react';

class Profile extends Component {
    render(){
        return(
            <div style={{width:'20vw',background:'yellow',height:'97vh',display:'flex',flexDirection:'column',justifyContent:'space-evenly',marginRight:'1vw',marginTop:'1.5vh',borderRadius:'0 10px 10px 0',marginBottom:'1.5vh'}}>
                <img src='' alt='profile'/>
                <p>Name</p>
                <p>Email</p>
            </div>
            )
    }
}

export default Profile