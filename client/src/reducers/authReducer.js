const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    user:{},
    error:null
}

const userReducer = (state = initialState,action) =>{
    switch(action.type){
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                isAuthenticated:true
            }

        case 'USER_LOADED':
            return{
                ...state,
                user:action.payload.user,
                isAuthenticated:true
            }
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
        case 'USER_LOAD_FAIL':
            localStorage.setItem('token',null)
            return{
                ...state,
                error:action.payload
            }

        case 'CLEAR_ERRORS':
            return{
                ...state,
                error:null
            }

        case 'LOGOUT':
            localStorage.setItem('token',null)
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                user:{}
            }

        default:
            return state
    }

}

export default userReducer;