import axios from 'axios'

export const searchUser=(username)=>(dispatch,getState)=>{

    const config = {
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':getState().auth.token
        }
    } 
    const body = JSON.stringify({username})

    axios.post('/search',body,config)
    .then(res=>{
        dispatch({
            type:'SEARCH_SUCCESS',
            payload:res.data
        })
    }).catch(e=>dispatch({
        type:'SEARCH_FAIL',
        payload:e.response.data.msg
    }))
}

export const clearErrors=()=>dispatch=>{
    dispatch({
        type:'CLEAR_ERRORS'
    })
}