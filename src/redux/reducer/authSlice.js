import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI, postAPI } from '~/config/api';
import { toast} from 'react-toastify';

const initialState = {
  token: '',
  userInfo: [],
  listCart: []
}

export const userLogin = createAsyncThunk('authLogin', async(users)=>{
  try{
    const response = await postAPI('/auth/sign-in', users)
    return response.data.token
  }
  catch(err){
    console.log(err);
     if(err.response.data.message === 'wrong email'){
        toast.error('Email không chính xác')
      }
      else{
          toast.error('Mật khẩu không chính xác')
      }
  }
})

export const getUserInfo = createAsyncThunk('userInfo', async()=>{
  const res = await getAPI('/auth/get-loged-in-user')
  return res.data.user
})

export const loginCart = createAsyncThunk('loginCart', async() => {
  const res = await getAPI('/cart/get-loged-in-cart')
  return res.data.cart.listProduct
})
const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
  },
  extraReducers: builder => (
      builder
          .addCase(userLogin.fulfilled, (state, action) => {
              state.token = action.payload
              localStorage.setItem('Token', JSON.stringify(state.token))
          })
          .addCase(getUserInfo.fulfilled, (state, action) => {
              state.userInfo = action.payload
              localStorage.setItem('User', JSON.stringify(state.userInfo))
          })
          .addCase(loginCart.fulfilled, (state, action) => {
            state.listCart = action.payload
            localStorage.setItem('list_cart', JSON.stringify(state.listCart))
          })
  )
});

export default authSlice.reducer