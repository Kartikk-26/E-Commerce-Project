
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterslice'
import userReducer from './user'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import { saveState, loadState } from "./localStorage";
const store = configureStore({
    reducer : {
        count : counterReducer,
        user : userReducer,
        product : productReducer,
        cart :  cartReducer
    } ,

    preloadedState : {
        cart : loadState()
    }
})

console.log(store.getState()) 
store.subscribe(()=>{
    saveState(store.getState().cart)
})
console.log(store) ;
export default store ;
