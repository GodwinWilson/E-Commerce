import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  email:null,
  userName:null,
  nickName:'',
  userID:null,
  cartItems:[]
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
        console.log(action.payload);
        const { email, userName, userID, nickName} = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName || nickName;
      state.userID = userID;
      state.nickName = nickName
    },
    SET_NICKNAME:(state,action) => {
      state.isLoggedIn = false;
      state.nickName = action.payload.nickName
    }, 
    REMOVE_ACTIVE_USER(state, action){
      state.isLoggedIn =false;
      state.email=null;
      state.userName=null;
      state.userID=null;
      state.nickName=''
    },
    ADD_TO_CART(state, action){
      //state.cartItems.push(action.payload)
      const itemIndex = state.cartItems.findIndex((item) => item.id ===action.payload.id)
      if (itemIndex >= 0) {
        // If the item is already in the cart, update its quantity
        state.cartItems[itemIndex].quantity += 1;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    UPDATE_ITEM_QUANTITY(state,action){
      const {itemId, quantity} = action.payload
      const itemIndex = state.cartItems.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += quantity;
        if (state.cartItems[itemIndex].quantity <= 0) {
          // If the quantity is less than or equal to zero, remove the item from the cart
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },
    REMOVE_ITEM_FROM_CART: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        state.cartItems.splice(itemIndex, 1);
      }
    },
  }
});

export const {SET_ACTIVE_USER, SET_NICKNAME, REMOVE_ACTIVE_USER, ADD_TO_CART, UPDATE_ITEM_QUANTITY, REMOVE_ITEM_FROM_CART} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.userName
export const selectUserID = (state) => state.auth.userID
export const selectNickName = (state) => state.auth.nickName;
export const selectCartItems = (state) => state.auth.cartItems 


export default authSlice.reducer