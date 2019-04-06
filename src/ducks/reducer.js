const initialState = {
    user:{},
    chats:[],
    messages:[
        {
            id:3,
            message:'hey',
            username:'hpotter'
        }
    ],
    friends:[],
    friend:{}
}

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_CHATS = 'UPDATE_CHATS';
const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
const CLEAR_ALL = 'CLEAR_ALL';
const UPDATE_FRIENDS = 'UPDATE_FRIENDS';
const SELECTED_FRIEND = 'SELECTED_FRIEND';

export function updateUser(user){
    return{
        type:UPDATE_USER,
        payload:user
    }
}

export function updateChats(chats){
    return{
        type:UPDATE_CHATS,
        payload:chats
    }
}

export function updateMessages(messages){
    return{
        type:UPDATE_MESSAGES,
        payload:messages
    }
}

export function updateFriends(friends){
    return{
        type:UPDATE_FRIENDS,
        payload:friends 
    }
}
export function selectedFriend(friend){
    return{
        type:SELECTED_FRIEND,
        payload:friend 
    }
}

export function clearAll(){
    return{
        type:CLEAR_ALL
    }
}

export default function Reducer(reduxState=initialState,action){
    switch(action.type){
        case UPDATE_USER:
            return {...reduxState,user:action.payload}
        case UPDATE_CHATS:
            return {...reduxState,chats:action.payload}
        case UPDATE_FRIENDS:
            return {...reduxState,friends:action.payload}
        case SELECTED_FRIEND:
            return {...reduxState,friend:action.payload}
        case UPDATE_MESSAGES:
            return {...reduxState,messages:action.payload}
        case CLEAR_ALL:
            return {...reduxState,user:{},chats:[],messages:[],friends:[],friend:{}}
        default:
            return {...reduxState}  
    }
}