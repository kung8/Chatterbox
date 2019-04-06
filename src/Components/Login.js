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

    async register(){
        const {first,last,email,password,username} = this.state
        console.log(first,last,email,password,username)
        const user = await axios.post('/api/user/register',{first,last,email,password,username});
        console.log(user.data)
        this.props.updateUser(user.data)
        this.props.history.push('/dashboard')
    }

    render(){
        return(
            <div>
                <form>
                    <input placeholder="first" onChange={e=>this.handleInput('first',e.target.value)}/>
                    <input placeholder="last" onChange={e=>this.handleInput('last',e.target.value)}/>
                    <input placeholder="email" onChange={e=>this.handleInput('email',e.target.value)}/>
                    <input placeholder="username" onChange={e=>this.handleInput('username',e.target.value)}/>
                    <input placeholder="password" onChange={e=>this.handleInput('password',e.target.value)}/>
                    <button onClick={()=>this.register()}>Register</button>
                </form>
            </div>
        )
    }
}


export default connect(null,{updateUser})(Login)