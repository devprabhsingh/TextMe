const initialState= {
    msgList:[],
    socket:{},
    peer:null,
    peerList:[],
    showVideo:false,
    showChatRoom:false,
    usersList:[],
    error:'',
    userInChat:{},
    cUsersList:[],
    callType:'',
    enableVideo:false
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
        case 'TOGGLE_VIDEO_CONTAINER':
            return{
                ...state,
                showVideo:action.payload.decision,
                callType:action.payload.callType,
                enableVideo:action.payload.enableVideo

            }
        case 'TOGGLE_CHAT_ROOM':
            return{
                ...state,
                showChatRoom:action.payload
            }
        case 'SET_USER_IN_CHAT':
            return{
                ...state,
                userInChat:action.payload
            }
            case 'GET_USERS_SUCCESS':
                return{
                    ...state,
                    usersList:action.payload
                }
            case 'GET_USERS_FAIL':
                return{
                    ...state,
                    usersList:[],
                    error:action.payload
                }
            case 'SAVE_USERSLIST':
                return{
                    ...state,
                    cUsersList:action.payload
                }  
        case 'SAVE_CALLER_ID':{
            return{
                ...state,
                callerId:action.payload
            }
        }
        default:
            return{
                ...state
            }
    }
}

export default chatReducer