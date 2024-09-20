import {createSlice} from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'count',
    initialState :{count :0},
    reducers : {
        increment : (state)=>{
            state.count += 1
        }
    }
});



console.log(counterSlice);

export const {increment} = counterSlice.actions

export default counterSlice.reducer;

