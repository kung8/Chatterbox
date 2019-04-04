import React, {Component} from 'react';

class Chat extends Component {
    render(){
        return(
            <div style={{width:'45vw',background:'green',height:'97vh',display:'flex',flexDirection:'column',justifyContent:'space-evenly',marginTop:'1.5vh',marginBottom:'1.5vh'}}>
                <img src='' alt='Individual or Group Pic'/>
                <h1>Individual or Group Name</h1>
                <p>Chat history from DB</p>
                <form>
                    <button>Pic Upload</button>
                    <button>Emoji</button>
                    <input placeholder='Send Message...'/>
                    <button>Send</button>
                </form>
            </div>
        )
    }
}

export default Chat