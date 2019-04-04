import React, {Component} from 'react';

class Chat extends Component {
    render(){
        return(
            <div style={{width:'45vw',background:'green',height:'97vh',display:'flex',flexDirection:'column',marginTop:'1.5vh',marginBottom:'1.5vh'}}>
                <div style={{display:'flex',alignItems:'center',background:'lightgrey',height:'10%',borderBottom:'darkgrey solid 0.05px',width:'100%',justifyContent:'space-between'}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <h1>Ginny Weasley</h1>
                        <div style={{marginLeft:'10px',marginRight:'10px',height:10,width:10,background:'red',borderRadius:'50%'}}></div>
                        <span>unavailable</span>
                    </div>
                    <div style={{display:'flex',width:'30%',height:'98%',alignItems:'center',justifyContent:'space-evenly'}}>
                        <i style={{fontSize:'25px', color:'#363E47'}} className="fas fa-folder"></i>
                        <i style={{fontSize:'25px', color:'#363E47'}} className="fas fa-phone"></i>
                        <i style={{fontSize:'25px', color:'#363E47'}} className="fas fa-video"></i>
                    </div>
                </div>
                <div style={{display:'flex',alignItems:'center',background:'lightgrey',height:'75%',maxHeight:'75%',width:'100%'}}>
                    <p>Chat history from DB</p>
                </div>
                <div style={{display:'flex',alignItems:'center',height:'15%',width:'100%'}}>
                    <form style={{display:'flex',width:'100%',height:'100%'}}>
                        <textarea placeholder='Send Message...' style={{maxWidth:'75%',minWidth:'75%',minHeight:'94%',maxHeight:'94%',fontSize:'20px'}}/>
                        <div style={{display:'flex',flexDirection:'column',width:'25%'}}>
                            <div style={{width:'100%',height:'50%'}}>
                                <button style={{height:'100%',width:'50%'}}><i className="fas fa-images" style={{fontSize:'25px'}}></i></button>
                                <button style={{height:'100%',width:'50%'}}><i className="far fa-smile-wink" style={{fontSize:'25px'}}></i></button>
                            </div>
                            <button style={{height:'50%'}}><i className="far fa-paper-plane" style={{fontSize:'25px'}}></i></button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Chat