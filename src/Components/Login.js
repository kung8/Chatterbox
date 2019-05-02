import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from './../ducks/reducer';
import styled from 'styled-components'
class Login extends Component {
    constructor(){
        super();
        this.state = {
            first:'',
            last:'',
            email:'',
            username:'',
            password:'',
        }
    }

    handleInput(prop,value){
        this.setState({
            [prop]:value
        })
    }
 
    register = async () => {
        const {first,last,email,password,username} = this.state
        if(first && last && email && password && username){
            console.log(first,last,email,password,username)
            const user = await axios.post('/api/user/register',{first,last,email,password,username});
            console.log(user.data)
            this.props.updateUser(user.data)
            this.props.history.push('/dashboard')
        } else {
            alert('please fill out all fields')
        }
    }

    login = async () => {
        const {username,password} = this.state;
        try{
            if(username && password){
                const user = await axios.post('/api/user/login',{username,password}) 
                console.log(user.data);
                this.props.updateUser(user.data)
                this.props.history.push('/dashboard')
            } else {
                alert('please fill out all fields')
            }
        } catch(err){   
            alert(err)
        }
    }

    render(){
        return(
            <div style={{background:'#5d697f',overflow:'hidden',width:"100vw",overflowY:'auto'}}>
                <span style={{display:'flex',justifyContent:'center',background:'#303841',height:'10vh',alignItems:'center',marginTop:'1.5vh',borderRadius:'10px 10px 0 0',marginLeft:'1vw',marginRight:'1vw'}}>
                    <h1 style={{letterSpacing:'0.25em',fontSize:45,color:'white'}}>CHATTERBOX</h1>
                </span>
                <div style={{display:'flex',height:'87vh',justifyContent:'space-evenly',alignItems:'center',background:'lightgrey',marginLeft:'1vw',marginRight:'1vw',marginBottom:'1.5vh',borderRadius:'0 0 10px 10px'}}>
                    <div style={{display:'flex',flexDirection:'column',width:'30vw',height:'70vh',alignItems:'center',borderRadius:'10px',background:'#5d697f'}}>
                        <div style={{height:'10%',borderBottom:'solid black',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',background:'#303841',borderRadius:'10px 10px 0 0'}}>
                            <h1 style={{fontSize:'2rem',letterSpacing:'0.1em',textAlign:'center',color:'white'}}>REGISTER</h1>
                        </div>                        
                        <form style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',height:'90%',alignItems:'center'}}>
                            <Input style={{width:'85%',height:'3rem',fontSize:'2rem',background:'#303841',color:'white'}} type="text" placeholder="First Name" onChange={e=>this.handleInput('first',e.target.value)}/>
                            <Input style={{width:'85%',height:'3rem',fontSize:'2rem',background:'#303841',color:'white'}} type="text" placeholder="Last Name" onChange={e=>this.handleInput('last',e.target.value)}/>
                            <Input style={{width:'85%',height:'3rem',fontSize:'2rem',background:'#303841',color:'white'}} type="text" placeholder="Email" onChange={e=>this.handleInput('email',e.target.value)}/>
                            <Input style={{width:'85%',height:'3rem',fontSize:'2rem',background:'#303841',color:'white'}} type="text" placeholder="Username" onChange={e=>this.handleInput('username',e.target.value)}/>
                            <Input style={{width:'85%',height:'3rem',fontSize:'2rem',background:'#303841',color:'white'}} type="password" placeholder="Password" onChange={e=>this.handleInput('password',e.target.value)}/>
                            <button style={{width:'60%',height:'40px',borderRadius:'10px',background:'#303841',color:'white',fontSize:30}} onClick={()=>this.register()}>Register</button>
                        </form>

                    </div>
                    <div style={{display:'flex',flexDirection:'column',width:'30vw',height:'70vh',alignItems:'center',borderRadius:'10px',background:'#5d697f'}}>
                        <div style={{height:'10%',borderBottom:'solid black',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',background:'#303841',borderRadius:'10px 10px 0 0'}}>
                            <h1 style={{fontSize:'2rem',letterSpacing:'0.1em',textAlign:'center',color:'white'}}>LOGIN</h1>
                        </div>
                        <form style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',height:'90%',alignItems:'center'}} >
                            <Input style={{width:'85%',height:'3rem',fontSize:'2rem',background:'#303841',color:'white'}} type="text" placeholder="Username" onChange={e=>this.handleInput('username',e.target.value)}/>
                            <Input style={{width:'85%',height:'3rem',fontSize:'2rem',background:'#303841',color:'white'}} type="password" placeholder="Password" onChange={e=>this.handleInput('password',e.target.value)}/>
                            <button style={{width:'60%',height:'40px',borderRadius:'10px',background:'#303841',color:'white',fontSize:30}} onClick={this.login}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(null,{updateUser})(Login)

const Input = styled.input`
&::-webkit-input-placeholder {
    color: lightgray;
}
&:focus {
    outline:none;
}
`