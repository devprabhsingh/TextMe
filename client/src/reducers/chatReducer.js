const initialState= {
    msgList:[],
    socket:{},
    peer:null,
    peerList:[],
    showVideo:false
}

const chatReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_MSG':
            return{
                ...state,
                msgList:[...state.msgList,action.payload]
            }
        case 'SAVE_MSG':
            return{
                ...state,
                msgList:[...state.msgList,action.payload]

            }
        case 'SET_SOCKET':
            return{
                ...state,
                socket:action.payload
            }
        case 'SAVE_PEER':
            return{
                ...state,
                peer:action.payload
            }
        case 'SAVE_PEER_LIST':
            return{
                ...state,
                peerList:action.payload
            }
        case 'SHOW_VIDEO_CONTAINER':
            return{
                ...state,
                showVideo:true
            }
        default:
            return{
                ...state
            }
    }
}

export default chatReducer