import {createSlice} from '@reduxjs/toolkit'

const initialState =  {
    status : false,
    userData : null
}

const AuthSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state,actino)=> {
            state.status = true
            state.userData = actino.payload.userData
        },
        logout : (state)=>{
            state.status = false
            state.userData = null
        }
    }
})

export const {login,logout} = AuthSlice.actions;

export  default AuthSlice.reducer

