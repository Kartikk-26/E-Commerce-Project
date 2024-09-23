import { configureStore } from "@reduxjs/toolkit";
import  useReducer from "./user";

const store = configureStore({
    reducer : {
        user : useReducer
    }
})

console.log(store)

export default store