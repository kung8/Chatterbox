import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from './../ducks/reducer';

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
            <div>
                <form>
                    <input type="text" placeholder="first" onChange={e=>this.handleInput('first',e.target.value)}/>
                    <input type="text" placeholder="last" onChange={e=>this.handleInput('last',e.target.value)}/>
                    <input type="text" placeholder="email" onChange={e=>this.handleInput('email',e.target.value)}/>
                    <input type="text" placeholder="username" onChange={e=>this.handleInput('username',e.target.value)}/>
                    <input type="password" placeholder="password" onChange={e=>this.handleInput('password',e.target.value)}/>
                    <button onClick={()=>this.register()}>Register</button>
                </form>
                <form>
                    <input type="text" placeholder="username" onChange={e=>this.handleInput('username',e.target.value)}/>
                    <input type="password" placeholder="password" onChange={e=>this.handleInput('password',e.target.value)}/>
                    <button onClick={this.login}>Login</button>
                </form>
            </div>
        )
    }
}


export default connect(null,{updateUser})(Login)