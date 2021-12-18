const initialState = {
    user:{},
    userFound:false,
    error:''
}

const searchReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'SEARCH_SUCCESS':
            return{
                ...state,
                user:action.payload,
                userFound:true
            }
        
        case 'SEARCH_FAIL':
            return{
                ...state,
                userFound:false,
                error:action.payload    
            }
        case 'CLEAR_ERRORS':
            return{
                ...state,
                error:''
            }
        default:
            return{
                ...state
            }
    }
}

export default searchReducer