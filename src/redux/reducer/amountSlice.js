import {createSlice} from '@reduxjs/toolkit'

export const amountSlice=createSlice({
    name:'amoutSlice',
    initialState:1,
    reducers:{
        increase: (state)=>{
            return state+=1
        },
        decrease: (state)=>{
            return state-=1
        },
}
})

export const {increase,decrease} =amountSlice.actions
export default amountSlice.reducer