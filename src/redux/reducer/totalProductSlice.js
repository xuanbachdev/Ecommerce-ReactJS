import {createSlice} from '@reduxjs/toolkit'
export const totalProductSlice=createSlice({
    name:'totalProduct',
    initialState:0,
    reducers:{
        counterTotalProduct:(state)=>{
            const data = localStorage.getItem('orderData')
            if (data){
                let storage = JSON.parse(localStorage.getItem('orderData'))
                return state=storage.length
            }
            else return 0
        },
        counterTotalProduct2:(state,action)=>{
            return state=action.payload
        }
    }
})

export default totalProductSlice.reducer
export const {counterTotalProduct,counterTotalProduct2} =totalProductSlice.actions