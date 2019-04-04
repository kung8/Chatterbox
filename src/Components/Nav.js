import React, {Component} from 'react';

const icons = {fontSize:'65px',color:'lightgrey'}
class Nav extends Component {
    render(){
        return(
            <div style={{marginLeft:'1vw',width:'10vw',background:'#303841',height:'97vh',display:'flex',flexDirection:'column',marginTop:'1.5vh',borderRadius:'10px 0px 0px 10px',marginBottom:'1.5vh'}}>
                    {/* <img src='' alt='Profile Pic'/> */}
                <div style={{height:'25%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
                    <div id="active-dot" style={{display:'flex',marginTop:10,marginLeft:'-55px'}}>
                        <div className="active-dot" id="red-dot"></div>
                        <div className="active-dot" id="yellow-dot"></div>
                        <div className="active-dot" id="green-dot"></div>
                    </div>
                    <img src='https://s3-us-west-1.amazonaws.com/marketin/Hermoine.jpeg' alt='profile' style={{height:'60%',width:'75%',borderRadius:'50%',background:'gold',position:'relative',filter:'grayscale(100%)'}}/>
                    <div style={{height:15,width:15,background:'green',borderRadius:'50%',boxShadow:'-1px -1px 3px 2px black',position:'absolute',top:'150px',left:'120px'}}></div>
                </div>

                <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',height:'60%',alignItems:'center'}}>
                    <i className="fas fa-comment" style={icons}></i>
                    <i className="fas fa-address-book" style={icons}></i>
                    <i className="fas fa-user" style={icons}></i>
                    <i className="fas fa-users" style={icons}></i>
                </div>
                <div style={{display:'flex',alignItems:'center',height:'15%',justifyContent:'center'}}>
                    <i className="fas fa-power-off" style={icons}></i>
                </div>
            </div>
        )
    }

}


export default Nav