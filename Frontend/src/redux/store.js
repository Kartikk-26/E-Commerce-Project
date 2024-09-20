import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './counterslice'

console.log(counterReducer);

const store = configureStore({
    reducer : {
        count : 
        counterReducer
    }
})

console.log(store)

export default store