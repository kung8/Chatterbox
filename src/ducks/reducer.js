const initialState = {
    user:{},
    chats:[],
    messages:[],
    friends:[],
    friend:{},
    chat:[],
    room:'',
    groupChat:[], //group chat
    groups:[], //all groups
    selectedGroup:{}, //select group
    selectedIndProfile:{},
    selectedGroupProfile:{}
}

const UPDATE_USER = 'UPDATE_USER';
const UPDATE_CHATS = 'UPDATE_CHATS';
const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
const CLEAR_ALL = 'CLEAR_ALL';
const UPDATE_FRIENDS = 'UPDATE_FRIENDS';
const SELECTED_FRIEND = 'SELECTED_FRIEND';
const UPDATE_CHAT = 'UPDATE_CHAT';
const UPDATE_ROOM = 'UPDATE_ROOM';
const UPDATE_GROUP_CHAT = 'UPDATE_GROUP_CHAT';
const UPDATE_GROUPS = 'UPDATE_GROUPS';
const SELECT_GROUP = 'SELECT_GROUP';
const UPDATE_SELECTED_IND_PROFILE = 'UPDATE_SELECTED_IND_PROFILE';
const UPDATE_SELECTED_GROUP_PROFILE = 'UPDATE_SELECTED_GROUP_PROFILE';


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

export function updateChat(chat){
    return{
        type:UPDATE_CHAT,
        payload:chat
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

export function updateRoom(room){
    return{
        type:UPDATE_ROOM,
        payload:room
    }
}

export function updateGroupChat(groupChat){
    return{
        type:UPDATE_GROUP_CHAT,
        payload:groupChat
    }
}
export function updateGroups(groups){
    return{
        type:UPDATE_GROUPS,
        payload:groups
    }
}

export function selectGroup(group){
    return{
        type:SELECT_GROUP,
        payload:group 
    }
}

export function updateSelectedIndProfile(profile){
    return{
        type:UPDATE_SELECTED_IND_PROFILE,
        payload:profile
    }
}
export function updateSelectedGroupProfile(group){
    return{
        type:UPDATE_SELECTED_GROUP_PROFILE,
        payload:group
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
        case UPDATE_CHAT:
            return {...reduxState,chat:action.payload,groupChat:[]}
        case UPDATE_FRIENDS:
            return {...reduxState,friends:action.payload}
        case SELECTED_FRIEND:
            return {...reduxState,friend:action.payload,selectedGroup:{}}
        case UPDATE_MESSAGES:
            return {...reduxState,messages:action.payload}
        case UPDATE_ROOM:
            return {...reduxState,room:action.payload}
        case UPDATE_GROUP_CHAT:
            return {...reduxState,groupChat:action.payload,chat:[],friend:{}}
        case UPDATE_GROUPS:
            return {...reduxState,groups:action.payload}
        case SELECT_GROUP:
            return {...reduxState,selectedGroup:action.payload,friend:{}}
        case UPDATE_SELECTED_GROUP_PROFILE:
            return {...reduxState,selectedGroupProfile:action.payload}
        case UPDATE_SELECTED_IND_PROFILE:
            return {...reduxState,selectedIndProfile:action.payload}    
        case CLEAR_ALL:
            return {...reduxState,user:{},chats:[],messages:[],friends:[],friend:{},chat:[],groupChat:[]}
        default:
            return {...reduxState}  
    }
}