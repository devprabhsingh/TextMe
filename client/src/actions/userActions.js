import axios from 'axios'

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

export const showUser=(user)=>(dispatch)=>{
    dispatch({
        type:'SHOW_USER',
        payload:user
    })
}

export const saveUsersList=(usersList)=>dispatch=>{
    dispatch({
        type:'SAVE_USERSLIST',
        payload:usersList
    })
}

