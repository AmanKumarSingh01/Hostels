import { GET_ERRORS, SET_CURRENT_USER ,GET_CURRENT_USER_DATA } from "./types"
import axios from 'axios'
import setAuthToken from "../utlis/setAuthToken";
import jwt_decode from 'jwt-decode'
//Register user

export const registerUser = (userData, history) => dispatch =>{
    axios.post('/api/user/register' , userData)
    .then(res=> history.push('/login'))
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    );
}


//Login user

export const loginUser =(userData) => dispatch =>{
    axios.post('api/user/login' , userData)
    .then(res =>{
        const {token} = res.data;
        //Save to local storage
        localStorage.setItem('jwtToken' , token);

        setAuthToken(token);
        
        //Decode token

        const decoded = jwt_decode(token);

        dispatch(setCurrentUser(decoded));
        dispatch(detailData(token));
    })
    .catch(err=>
        dispatch({
            type :GET_ERRORS,
            payload : err.response.data
        })
    )
}


//set current user

export const setCurrentUser =(decoded) =>{
    return {
        type : SET_CURRENT_USER,
        payload :decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    dispatch(getAllDetails({}));
};


//Get user details

export const detailData =(token) => dispatch =>{
    setAuthToken(token);

    axios.get('/api/user/current')
        .then(result =>{
            dispatch(getAllDetails(result.data));
        })
        .catch(err=>
            dispatch({
                type :GET_ERRORS,
                payload : err.response.data
            })
        )
    
}


export const getAllDetails =(data) =>{
    return {
        type : GET_CURRENT_USER_DATA,
        payload :data
    }
}

