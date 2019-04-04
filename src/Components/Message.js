import React, {Component} from 'react';


class Message extends Component {
    render(){
        return(
            <div style={{width:'25vw',background:'#363E47',height:'97vh',display:'flex',flexDirection:'column',justifyContent:'space-evenly',marginTop:'1.5vh',marginBottom:'1.5vh'}}>
                <div style={{height:'10%',display:'flex',justifyContent:'space-evenly',alignItems:'center', borderBottom:'lightgrey solid 0.02px'}}>
                    <form style={{background:'#303841',width:'65%',height:'65%',borderRadius:'16px',display:'flex',alignItems:'center'}}>
                        <i className="fas fa-search" style={{fontSize:'25px',color:'lightgrey',marginLeft:'5px',marginRight:'0.5rem'}}></i>
                        <input placeholder='Search' id="search-input" style={{fontSize:'25px',background:'#303841',color:'lightgrey',height:'65%',width:'78%',border:'transparent'}}/>
                    </form>
                    
                    <button id="new-chat" style={{height:'65%',width:'15%',borderRadius:'50%',background:'#303841',border:'#303841'}}>
                        <i style={{fontSize:'25px',color:'lightgrey'}} className="fas fa-plus"></i>
                    </button>
                </div>
                <div style={{height:'90%'}}>
                    message history containing the profile/group pics and the name and the most recent message
                </div>
                {/* <div style={{height:10,width:10,background:'red',borderRadius:'50%',boxShadow:'-1px -1px 3px 1px black'}}></div> */}

            </div>
        )
    }
}

export default Message