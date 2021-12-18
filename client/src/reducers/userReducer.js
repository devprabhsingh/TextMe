const initialState = {
    usersList:[],
    error:'',
    userInChat:{},
    cUsersList:[],
    isChatRoomOpen:false,
    launchVideo:false
}

const userReducer=(state = initialState,action)=>{
    switch(action.type){
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
        case 'SHOW_USER':
            return{
                ...state,
                userInChat:action.payload,
                isChatRoomOpen:true
            }
        case 'SAVE_USERSLIST':
            return{
                ...state,
                cUsersList:action.payload
            }
        default:
            return{
                ...state
            }
    }
}
export default userReducer