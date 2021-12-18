import axios from 'axios'

export const loadUser=()=>(dispatch,getState)=>{
    const config = {
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':getState().auth.token
        }
    }

    axios.get('/user',config)
    .then(res=>{
        dispatch({
            type:'USER_LOADED',
            payload:res.data
        })
    }).catch(err=>{
        dispatch({
            type:'USER_LOAD_FAIL',
            payload:err.response.data.msg
        })}
    )
}
export const register=({username,email,password})=> dispatch=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({username,email,password})

    axios.post('/auth/register',body,config)
        .then(res=>dispatch({
            type:'REGISTER_SUCCESS',
            payload:res.data
        }))
        .catch(err=>{
            dispatch({
                type:'REGISTER_FAIL',
                payload:err.response.data.msg
            })
        })
}

export const login=({email,password})=>dispatch=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password})

    axios.post('/auth/login',body,config)
    .then(res=>dispatch({
        type:'LOGIN_SUCCESS',
        payload:res.data
    }))
    .catch(err=>dispatch({
        type:'LOGIN_FAIL',
        payload:err.response.data.msg
    }))
}

export const clearErrors=()=>dispatch=>{
    dispatch({
        type:'CLEAR_ERRORS'
    })
}

export const logout=()=>dispatch=>{
    dispatch({
        type:'LOGOUT'
    })
}
