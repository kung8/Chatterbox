const initialState = {
    user:{},
    users:[],
    messages:[]
}

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USERS = 'UPDATE_USERS';
const UPDATE_MESSAGES = 'UPDATE_MESSAGES';

export function updateUser(user){
    return{
        type:UPDATE_USER,
        payload:user
    }
}

export function updateUsers(users){
    return{
        type:UPDATE_USERS,
        payload:users
    }
}

export function updateMessages(messages){
    return{
        type:UPDATE_MESSAGES,
        payload:messages
    }
}

export default function Reducer(reduxState=initialState,action){
    switch(action.type){
        case UPDATE_USER:
            return {...reduxState,user:action.payload}
        case UPDATE_USERS:
            return {...reduxState,users:action.payload}
        case UPDATE_MESSAGES:
            return {...reduxState,messages:action.payload}
        default:
            return {...reduxState}  
    }
}