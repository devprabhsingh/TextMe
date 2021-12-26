import axios from 'axios'

export const setSocket=(socket)=>dispatch=>{
    dispatch({
        type:'SET_SOCKET',
        payload:socket
    })
}
export const addMsg=(msg)=>dispatch=>{
    dispatch({
        type:'ADD_MSG',
        payload:msg
    })
}

export const sendMsg=(msg)=> (dispatch,getState)=>{
    dispatch({
        type:'SAVE_MSG',
        payload:msg
    })
    const socket = getState().chat.socket
    socket.emit('message',msg)
    
}

export const savePeer=(peer)=>(dispatch)=>{
    dispatch({
        type:'SAVE_PEER',
        payload:peer
    })
}

export const savePeerList=peerList=>dispatch=>{
    dispatch({
        type:'SAVE_PEER_LIST',
        payload:peerList
    })
}

export const toggleVideoContainer=(decision,callType,enableVideo)=>dispatch=>{
    dispatch({
        type:'TOGGLE_VIDEO_CONTAINER',
        payload:{decision,callType,enableVideo}
    })
}

export const toggleChatRoom=(decision)=>dispatch=>{
    dispatch({
        type:'TOGGLE_CHAT_ROOM',
        payload:decision
    })
}

export const setUserInChat=(user)=>dispatch=>{
    dispatch({
        type:'SET_USER_IN_CHAT',
        payload:user
    })
}

export const getAllUsers=()=>(dispatch,getState)=>{

    const config = {
        headers:{
            'x-auth-token':getState().auth.token
        }
    }
    axios.get('/getAllUsers',config)
    .then(res=>dispatch({
        type:'GET_USERS_SUCCESS',
        payload:res.data
    }))
    .catch(e=>{
        dispatch({
            type:'GET_USERS_FAIL',
            payload:e.response.data.msg
        })
    })
    
}

export const saveUsersList=(usersList)=>dispatch=>{
    dispatch({
        type:'SAVE_USERSLIST',
        payload:usersList
    })
}
