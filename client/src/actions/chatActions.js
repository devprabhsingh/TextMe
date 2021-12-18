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

export const showVideoContainer=()=>dispatch=>{
    dispatch({
        type:'SHOW_VIDEO_CONTAINER'
    })
}
